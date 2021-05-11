from decimal import Decimal
import datetime

from rest_framework import viewsets, fields
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from sequences import get_next_value
from datetime import datetime
from dateutil.relativedelta import relativedelta

from .serializers import TransactionSerializer
from .models import Transaction
from accounts.models import Account
from users.models import User


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.filter().order_by('id')
    serializer_class = TransactionSerializer
    permission_classes = (IsAuthenticated, IsAdminUser)

    @action(methods=['post'], detail=False,
            url_path='transfer', url_name='transfer', permission_classes=[IsAuthenticated])
    def transfer(self, request):
        from_account = Account.objects.filter(accountNumber=request.data['fromAccount']).first()
        to_account = Account.objects.filter(accountNumber=request.data['toAccount']).first()
        amount = Decimal(request.data['amount'])
        txn_desc = request.data['txnDesc']
        if from_account.balance < amount:
            return Response({'status': 'Failure', 'message': 'Insufficient balance'})
        user = from_account.user
        txn_ref_no = get_next_value("txnRefNo")
        debit_entry = Transaction.objects.create(txnRefNo=txn_ref_no, account=from_account,
                                                 txnType=Transaction.TxnTypes.DEBIT, createdBy=user,
                                                 amount=amount, txnDesc=txn_desc)
        from_account.balance -= amount
        credit_entry = Transaction.objects.create(txnRefNo=txn_ref_no, account=to_account,
                                                  txnType=Transaction.TxnTypes.CREDIT, createdBy=user,
                                                  amount=amount, txnDesc=txn_desc)
        to_account.balance += amount
        debit_entry.save()
        credit_entry.save()
        from_account.save()
        to_account.save()
        return Response({'status': 'Success', 'message': 'Money transferred!',
                         'transactionDetails': TransactionSerializer(debit_entry).data})

    @action(methods=['post'], detail=False, url_path='search', url_name='search', permission_classes=[IsAuthenticated])
    def search(self, request):
        filters = {}
        account_no = request.data['accountNumber']
        is_valid = False
        for account in Account.objects.filter(user=self.request.user):
            if account_no == account.accountNumber:
                is_valid = True
                break
        if not is_valid:
            account_no = 0
        filters['account'] = account_no
        filters['creationDate__gt'] = datetime.now() - relativedelta(months=18)
        if 'txnType' in request.data and len(request.data['txnType']) != 0:
            filters['txnType'] = request.data['txnType']
        if 'fromDate' in request.data and len(request.data['fromDate']) != 0:
            filters['creationDate__gte'] = datetime.strptime(request.data['fromDate'], '%Y-%m-%d')
        if 'toDate' in request.data and len(request.data['toDate']) != 0:
            filters['creationDate__lte'] = datetime.strptime(request.data['toDate'], '%Y-%m-%d')
        transactions = TransactionSerializer(Transaction.objects.filter(**filters), many=True)
        return Response(transactions.data)

    @action(methods=['post'], detail=False, url_path='add', url_name='add', permission_classes=[IsAdminUser])
    def add(self, request):
        account = Account.objects.filter(accountNumber=request.data.pop('account')).first()
        transaction = Transaction.objects.create(account=account, txnRefNo=get_next_value("txnRefNo"),
                                                 createdBy=self.request.user, **request.data)
        txn_type = transaction.txnType
        if Transaction.TxnTypes.DEBIT == txn_type or Transaction.TxnTypes.FEES == txn_type:
            account.balance -= Decimal(transaction.amount)
        else:
            account.balance += Decimal(transaction.amount)
        transaction.save()
        account.save()
        return Response(TransactionSerializer(transaction).data)
