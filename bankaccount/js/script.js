// M13 Assignment- Bank Account application
// Maria Cecilia Schultz

const $ = (id) => document.getElementById(id)

// DOM elements
btnName = $('btnName')
btnDeposit=$('btnDeposit')
btnWithdrawal=$('btnWithdrawal')
msgBalance= $('msgBalance')
acctTitle=$('acctTitle')

// the account
let account

const bankAccount = (owner) => {
    let _balance = 0
    let _owner=owner
    return {
      getOwnerName: function() {
        return _owner
      },
      getBalance: function() {
        return _balance
      },
      deposit: function(depositAmount) {
        // deposit only if amount is positive
        if (depositAmount>0) {
            _balance += depositAmount
        }
        return _balance
      },
      withdrawal: function(withdrawalAmount) {
        //withdraw only if there is enough money to cover the withdrawal
        if (_balance>= withdrawalAmount) {
            _balance -= withdrawalAmount
        }
        return _balance
      },
    }
  }

  // New Bank Account
  function handleNewAccount() {
    let name = prompt('Enter account owner: ')
    
    // instantiate the account
    account = bankAccount(name)
  
    // set the header title tag to show name
    acctTitle.innerHTML=`Account Owner: ${name}`
    displayAccountBalance(account) // display the amount. Will be at first

    disableTransactionButtons(false) // eow enable transaction buttons
  }

  // Handle a deposit
  function handleDeposit() {
    let depositAmount= getTransactionAmount('Enter the deposit amount: ')
    account.deposit(depositAmount) 
    displayAccountBalance(account)
  }

  // Handle a withdrawal
  function handleWithdrawal() {
    let withdrawalAmount= getTransactionAmount('Enter the withdrawal amount: ')
    account.withdrawal(withdrawalAmount)
    displayAccountBalance(account)
  }

  // Sets the p tag with the current account balance
  function displayAccountBalance(acct) {
    formattedBalance =acct.getBalance().toLocaleString('en-US', {style:'currency',currency: 'USD'})
    msgBalance.innerHTML=`Your current account balance is: ${formattedBalance}`
  }

  // Helper to get amount input
  // Validate amount is a positive numeric amount
  function getTransactionAmount(message) {
    let floatNum  
    while (true) {
      let input = prompt(`${message}: `)
      if (!isNaN(input)) {
        floatNum = parseFloat(input)
        if (floatNum>0) {
          break
        }
      }
    }
    return floatNum
  }

  function disableTransactionButtons(disabledValue) {
    btnDeposit.disabled=disabledValue
    btnWithdrawal.disabled=disabledValue
  }
  
  function init() {
     // at the beginning, disable deposit and withdrawal until the account object has been instantiated
      disableTransactionButtons(true)
  }

  // button handlers
  window.addEventListener('load', () => {
    init()
    btnName.addEventListener('click', handleNewAccount)
    btnDeposit.addEventListener('click', handleDeposit)
    btnWithdrawal.addEventListener('click', handleWithdrawal)

})
