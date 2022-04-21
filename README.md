# ECommerceProject  
  
   Project Structure:  
  
   ~ Onion Architecture  
   ~ Entity Framework Core for ORM with Code First approach (Microsoft.EntityFrameworkCore)  
   ~ Sql Server for Database (Microsoft.EntityFrameworkCore.SqlServer)  
   ~ Dependency Injection (Microsoft.Extensions.DependencyInjection)  
   ~ CORS Options  
   ~ Dtos for Requests and Responses  
   ~ Custom Responses  
   ~ Moved Services from Controllers to Application Layer  
  
   Plans:  
  
   1-) JWT / Authorization / Authentication  
   2-) Password Hashing  
   3-) Unique URLs  
  
   Future:  
  
   1-) Pagination  
   2-) Sort By (Name, Price, Date)  
   3-) EMail Notification for Orders (It will be implemented but it will probably be disabled.)  
   4-) Light / Dark Mode Toggle  
   5-) CQRS (with MediatR and AutoMapper)  
  
   Maybe:  
  
   1-) User Personal Mail  
   2-) Mails between Users  
   3-) Notifications for User EMail and in Personal Mail (Replies to Comments, Comments to Product, Order Status...)  
  
   Need To Check:  
  
   ~ More optimization for Delete/deActivate interactions. For Example; When a Product gets deleted, Orders tied to it should change to 'Status: 0', which should mean 'Cancelled', instead of being deleted along with it.  
  
   Done:  
  
   ~ Validations:  
      EMail Regex Check for User and Seller Accounts, when Creating and Updating.  
      Unique Username and Email check, for User and Seller Accounts, when Creating and Updating.  

  Database Relations:  
  
  <img alt="Database-Relations" src="/Database/DB from 21-04-2022.jpeg">
