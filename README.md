# ECommerceProject  
  
   # Table of Content  
  
   - [Project Structure](#project-structure)  
   - [CheckList](#check-list)  
   - [Future Plans](#future-plans)
   - [Need To Think](#need-to-think)
   - [Flaws](#flaws)
   - [Database Relations](#database-relations)
  
   #### Project Structure:  
  
   These are the Standards/Coding Conventions/Best Practices that I tried to follow in my code and Technologies/Libraries that I used. As I am still a beginner, I may not have implemented them perfectly. I'm still learning more about them and all the other new information while coding and creating projects!  
  
   ~ OOP  
   - API  
   ~ Onion Architecture  
   ~ C# for Backend, API with ASP.Net Core 6  
   ~ Entity Framework Core for ORM with Code First approach (Microsoft.EntityFrameworkCore)  
   ~ MsSql Server for Database (Microsoft.EntityFrameworkCore.SqlServer)  
   ~ Dependency Injection (Microsoft.Extensions.DependencyInjection)  
   ~ CORS Options  
   ~ Dtos for Requests and Responses  
   ~ Custom Responses   
   ~ Password Hashing (BCrypt.Net-Next)  
   ~ Jwt (System.IdentityModel.Tokens.Jwt)  
   - Client  
   ~ JS for Frontend, Client with React Library  
   ~ Redux for State Management (with Redux-Thunk and Redux-Persist)  
   ~ Bootstrap Css Framework  
  
   #### CheckList:  
  
   ~ Validations:  
      - EMail Regex Check for User and Seller Accounts, when Creating and Updating.  
      - Unique Username and EMail check, for User and Seller Accounts, when Creating and Updating.  
      - Checking if the necessary input is Empty or not.  
      - Many more misc. checks (CreateCommentReply -> Comment belongs to the same Product? To User? Product belongs to the Seller?).  
   ~ Moved 'EntityServices' from Controllers to a new Layer(Service).  
   ~ Pagination. Added to the Table Component and also created a seperate Component.  
   ~ Sort By (Name, Price, DateCreated/Id (+Reversed)). Added to the Table Component and also created a seperate Component.  
   ~ New PagedResponse Dto (with: success, message, data, sortInfo).  
   ~ Light / Dark mode for Store Front.  
   ~ Password Hashing.  
   ~ Jwt / Authorization / Authentication ; Full Auth for Admin and Seller fronts, partial for Store (Using cookies).  
   ~ Re-Routed all Fronts through their respective 'Main' components to check authorization.  
   ~ LogIn and Register Pages.  
   ~ Unique Layouts for all Fronts (used AdminLTE(in a very simple way) for Admin, simple Top and Side nav for Seller, 3 TopNavs and 1 Footer for Store) plus a shared TopNav for 3Front Navigation.  
   ~ Added .env file for API Connections and Switch Cases for Actions.  
   ~ Dummy Pages in Store, so you can check the ProductList and SingleProduct page layout even if there isn't an API connection.  
   ~ NotFound pages (For each three Fronts and also a general purpose one), you can customise the Object name.  
   ~ Profile Page (Shared on All Fronts, Also by User and Seller accounts (With differentiating information)). Admin and Seller has single page, while store takes the id with useParams and shows the profile of the account with that id (Conditional editing).  
   ~ Cart Re-Implemented from previous project (a MiniCart to the Navbar and a table format for its own Page)  
   ~ Sub Profile pages for StoreFront (Cart, Orders, Comments), with authorization check.  
   ~ SingleProductPage (has its own HttpRequest), with comment section.  
   ~ ProductCommentSection, only UserAccounts can Create and Like comments. CommentReply system (only the Seller of the Product is authorized to Create). Edit feature for Comments and CommentReplies, only for the writer.  
   ~ Added toastify for alerts.  
  
   #### Future Plans (For this or future Projects):  
  
   1-) Unique URLs  
   2-) EMail Notification for Orders (It might be implemented but it will probably be disabled.)  
   3-) Account Personal MailBox  
   4-) Mails between Accounts  
   5-) Notifications for Personal EMail and in Account MailBox (Replies to Comments, Comments to Products, Order Status Update...)  
   6-) DDD with CQRS (with MediatR and AutoMapper) => I will probably implement this on the next project.  
   7-) Debounce for Text-Inputs  
   8-) Infinite Scrolling  
   9-) Breadcrumbs  
  
   #### Need To Think:  
  
   ~ More optimization for Delete/deActivate interactions. For Example; When a Product gets deleted, Orders tied to it should change to 'Status: 0', which should mean 'Cancelled', instead of being deleted along with it.  
  
   #### Flaws:  
  
   ~ In One to Many relationships, I put 'One's 'Name' in 'Many's properties. So when I request a 'Product' entity for example, I also get the name of 'Category' it belongs to, which is a 'One' of 'Many' Products. I did it independently, as such, if the 'One's name, changes, it won't affect and 'update' for the 'Many's. They will still show the old 'Name' of the 'One'. It should be fixable with propper mapping, requesting the 'Name' of 'One' each time the 'Many' is called instead of adding it as a property.  
   ~ When an Account Logs In, API sends the account data and we store it inside Redux State but it doesn't happen with 'Verify'. As such, if an account information gets 'Updated', it doesn't show until the account re-logs. API needs to send account information after each verification too, just like LogIn.  
   ~ Order Actions for Users and Sellers, since I am using my own 'Table' component, I can't really check the Orders Status specifically ('Cancelled' or 'Received') and make a condition (Can't be updated once its 'Cancelled' or 'Received').  
   ~ Not using the 'Discount' prop on Orders/Product at the moment.  
  
   #### Database Relations 
   ~ (Root of the Arrow represents 'One' and Tip represents 'Many'):  
  
  <img alt="Database-Relations" src="/Database/DB from 21-04-2022.jpeg">
