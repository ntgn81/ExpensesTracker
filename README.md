ExpensesTracker
===============

# API

## Login (get token for subsequent calls)

http://expensestracker.herokuapp.com/auth?email={email}&password={password}

Sample: http://expensestracker.herokuapp.com/auth?email=t@t&password=t

## Get expenses

GET http://expensestracker.herokuapp.com/api/expenses?token={token}

Sample: http://expensestracker.herokuapp.com/api/expenses?token=53f618d6b46e3f020023493a

## Get expense by id:

GET http://expensestracker.herokuapp.com/api/expenses/{expenseId}?token={token}

Sample: http://expensestracker.herokuapp.com/api/expenses/53f61930b46e3f020023493d?token=53f618d6b46e3f020023493a

## Delete expense by id

DELETE http://expensestracker.herokuapp.com/api/expenses/{expenseId}?token={token}

## Create expense

POST http://expensestracker.herokuapp.com/api/expenses/{expenseId}?token={token}

## Update expense

PUT http://expensestracker.herokuapp.com/api/expenses/{expenseId}?token={token}

