# ECommerceProject  
  
   Project Structure:  
  
   ~ Onion Architecture  
   ~ Entity Framework Core for ORM with Code First approach (Microsoft.EntityFrameworkCore)  
   ~ Sql Server for Database (Microsoft.EntityFrameworkCore.SqlServer)  
   ~ Dependency Injection (Microsoft.Extensions.DependencyInjection)  
   ~ CORS Options  
   ~ Dtos for Requests and Responses  
   ~ Custom Responses   
  
   Plans:  
  
   1-) JWT / Authorization / Authentication  
   2-) Password Hashing  
   3-) Unique URLs  
   4-) EMail Notification for Orders (It will be implemented but it will probably be disabled.)  
  
   Maybe:  
  
   1-) User Personal Mail  
   2-) Mails between Users  
   3-) Notifications for User EMail and in Personal Mail (Replies to Comments, Comments to Product, Order Status...)  
   5-) CQRS (with MediatR and AutoMapper) => I will probably implement this on the next project.  
  
   Need To Check:  
  
   ~ More optimization for Delete/deActivate interactions. For Example; When a Product gets deleted, Orders tied to it should change to 'Status: 0', which should mean 'Cancelled', instead of being deleted along with it.  
  
   Flaws:  
  
   ~ In 1 to Many relationships, I put 'One's 'Name' in 'Many's properties. So when I request a 'Product' entity for example, I also get the name of 'Category' it belongs to, which is a 'One' of 'Many' Products. I did it independently, as such, if the 'One's name, changes, it won't affect and 'update' for the 'Many's. They will still show the old 'Name' of the 'One'. It should be fixable with propper mapping, requesting the 'Name' of 'One' each time the 'Many' is called instead of adding it as a property.  
  
   Done:  
  
   ~ Validations:  
      - EMail Regex Check for User and Seller Accounts, when Creating and Updating.  
      - Unique Username and EMail check, for User and Seller Accounts, when Creating and Updating.  
   ~ Moved 'EntityServices' from Controllers to a new (Service) Layer.  
   ~ Pagination.  
   ~ Sort By (Name, Price, DateCreated/Id (+Reversed)).  
   ~ Light / Dark mode for Store Front.  
  
  Database Relations:  
  
  <img alt="Database-Relations" src="/Database/DB from 21-04-2022.jpeg">
