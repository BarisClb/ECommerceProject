# ECommerceProject  
  
   Project Structure:  
  
   These are the Standards/Coding Conventions/Best Practices that I tried to follow in my code and Technologies/Libraries that I used. As I am still a beginner, I may not have implemented them perfectly. I'm still learning more about them and all the other new information while coding and creating projects!  
  
   ~ Onion Architecture  
   ~ OOP  
   ~ C# for Backend, API with ASP.Net 6  
   ~ Entity Framework Core for ORM with Code First approach (Microsoft.EntityFrameworkCore)  
   ~ MsSql Server for Database (Microsoft.EntityFrameworkCore.SqlServer)  
   ~ Dependency Injection (Microsoft.Extensions.DependencyInjection)  
   ~ CORS Options  
   ~ Dtos for Requests and Responses  
   ~ Custom Responses   
   ~ Password Hashing (BCrypt.Net-Next)  
   ~ JWT (System.IdentityModel.Tokens.Jwt)  
   ~ JS for Frontend, Client with React Library  
   ~ Redux for State Management (with Redux-Thunk and Redux-Persist)  
   ~ Bootstrap Css Framework
  
   Future Plans (For this and future Projects):  
  
   1-) JWT / Authorization / Authentication  
   2-) Unique URLs  
   3-) EMail Notification for Orders (It might be implemented but it will probably be disabled.)  
   4-) Account Personal MailBox  
   5-) Mails between Accounts  
   6-) Notifications for Personal EMail and in Account MailBox (Replies to Comments, Comments to Products, Order Status Update...)  
   7-) DDD with CQRS (with MediatR and AutoMapper) => I will probably implement this on the next project.  
  
   Need To Think:  
  
   ~ More optimization for Delete/deActivate interactions. For Example; When a Product gets deleted, Orders tied to it should change to 'Status: 0', which should mean 'Cancelled', instead of being deleted along with it.  
  
   Flaws:  
  
   ~ In One to Many relationships, I put 'One's 'Name' in 'Many's properties. So when I request a 'Product' entity for example, I also get the name of 'Category' it belongs to, which is a 'One' of 'Many' Products. I did it independently, as such, if the 'One's name, changes, it won't affect and 'update' for the 'Many's. They will still show the old 'Name' of the 'One'. It should be fixable with propper mapping, requesting the 'Name' of 'One' each time the 'Many' is called instead of adding it as a property.  
   ~ When an Account Logs In, API sends the account data and we store it inside Redux State but it doesn't happen with 'Verify'. As such, if an account information gets 'Updated', it doesn't show until the account re-logs. API needs to send account information after each verification too, just like LogIn.  
  
   CheckList:  
  
   ~ Validations:  
      - EMail Regex Check for User and Seller Accounts, when Creating and Updating.  
      - Unique Username and EMail check, for User and Seller Accounts, when Creating and Updating.  
   ~ Moved 'EntityServices' from Controllers to a new (Service) Layer.  
   ~ Pagination.  
   ~ Sort By (Name, Price, DateCreated/Id (+Reversed)).  
   ~ Light / Dark mode for Store Front.  
   ~ Password Hashing  
  
   Database Relations (Root of the Arrow represents 'One' and Tip represents 'Many'):  
  
  <img alt="Database-Relations" src="/Database/DB from 21-04-2022.jpeg">
