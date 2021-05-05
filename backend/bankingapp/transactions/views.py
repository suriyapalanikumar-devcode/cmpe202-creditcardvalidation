from decimal import Decimal

from rest_framework import viewsets
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
    queryset = Transaction.objects.filter(id=0).order_by('id')
    serializer_class = TransactionSerializer
    permission_classes = (IsAuthenticated,)

    @action(methods=['post'], detail=False,
            url_path='transfer', url_name='transfer')
    def transfer(self, request):
        from_account = Account.objects.filter(accountNumber=request.POST.get('fromAccount')).first()
        to_account = Account.objects.filter(accountNumber=request.POST.get('toAccount')).first()
        amount = Decimal(request.POST.get('amount'))
        txn_desc = request.POST.get('txnDesc')
        if from_account.balance < amount:
            return Response({'status': 'insufficient balance'})
        user = from_account.user
        txn_ref_no = get_next_value("txnRefNo")
        debit_entry = Transaction.objects.create(txnRefNo=txn_ref_no, account=from_account,
                                                 txnType=Transaction.TxnTypes.DEBIT, createdBy=user,
                                                 amount=request.data['amount'], txnDesc=txn_desc)
        from_account.balance -= amount
        credit_entry = Transaction.objects.create(txnRefNo=txn_ref_no, account=to_account,
                                                  txnType=Transaction.TxnTypes.CREDIT, createdBy=user,
                                                  amount=request.data['amount'], txnDesc=txn_desc)
        to_account.balance += amount
        debit_entry.save()
        credit_entry.save()
        from_account.save()
        to_account.save()
        return Response(TransactionSerializer(debit_entry).data)

    @action(methods=['post'], detail=False, url_path='search', url_name='search')
    def search(self, request):
        filters = {}
        account_no = request.POST.get('accountNumber')
        filters['account'] = account_no
        txn_type = request.POST.get('txnType')
        from_date = request.POST.get('fromDate')
        to_date = request.POST.get('toDate')
        if txn_type:
            filters['txnType'] = txn_type
        if from_date:
            filters['creationDate__gte'] = from_date
        if to_date:
            filters['creationDate__lte'] = to_date
        cutoff_date = datetime.now() - relativedelta(months=18)
        transactions = TransactionSerializer(Transaction.objects.filter(**filters,
                                                                        creationDate__gt=cutoff_date), many=True)
        return Response(transactions.data)

    @action(methods=['post'], detail=False, url_path='add', url_name='add', permission_classes=[IsAdminUser])
    def add(self, request):
        account = Account.objects.filter(accountNumber=request.data.pop('account')).first()
        transaction = Transaction.objects.create(account=account, txnRefNo=get_next_value("txnRefNo"),
                                                 createdBy=User.objects.get(id=1), **request.data)
        txn_type = transaction.txnType
        if Transaction.TxnTypes.DEBIT == txn_type or Transaction.TxnTypes.FEES == txn_type:
            account.balance -= Decimal(transaction.amount)
        else:
            account.balance += Decimal(transaction.amount)
        transaction.save()
        account.save()
        return Response(TransactionSerializer(transaction).data)
