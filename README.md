# ECommerceProject  
  
   Plans:  
  
   1-) JWT / Authorization / Authentication  
   2-) Pagination  
   3-) Sort By (Name, Price, Date)  
   4-) EMail Notification for Orders (It will be implemented but it will probably be disabled.)  
   5-) Password Hashing  
   6-) Unique URL Generator  
  
   Future:  
  
   1-) User Personal Mail  
   2-) Mails between Users  
   3-) Notifications for User EMail and in Personal Mail (Replies to Comments, Comments to Product, Order Status...)  
   4-) Light / Dark Mode Toggle  
  
   Maybe:  
  
   ~ Nothing yet.  
  
   Need To Check:  
  
   ~ More optimization for Delete/deActivate interactions. For Example; When a Product gets deleted, Orders tied to it should change to 'Status: 0', which should mean 'Cancelled', instead of being deleted along with it.  
  
   Done:  
  
   ~ Validations:  
      EMail Regex Check for User and Seller Accounts, when Creating and Updating.  
      Unique Username and Email check, for User and Seller Accounts, when Creating and Updating.  
   ~ Seller Reply System (Replies to Comments on Seller's own products.)  
  