# ECommerceProject  
  
  ### Languages:  
  
  Bu yazının Türkçe versiyonunu okumak için [buraya](https://github.com/BarisClb/ECommerceProject/blob/main/README_TR.md) tıklayabilirsiniz.  
  
  ### Anchor Links:
  
   - [Project Structure](#project-structure)  
   - [CheckList](#checklist)  
   - [Future Plans](#future-plans)  
   - [Need To Think](#need-to-think)  
   - [Flaws](#flaws)  
   - [Database Relations](#database-relations)  
   - [Starting the Project](#starting-the-project)  
  
   ## Project Structure:  
  
   These are the Standards/Coding Conventions/Best Practices that I tried to follow in my code and Technologies/Libraries that I used. As I am still a beginner, I may not have implemented them perfectly. I'm still learning more about them and all the other new information while coding and creating projects!  
  
   - OOP  
   - SOLID Principles  
   - Clean Code  
   - API  
     - Onion Architecture  
     - C# for Backend, API with ASP.Net Core 6  
     - Entity Framework Core for ORM with Code First approach (Microsoft.EntityFrameworkCore)  
     - MsSql Server for Database (Microsoft.EntityFrameworkCore.SqlServer)  
     - Dependency Injection (Microsoft.Extensions.DependencyInjection)  
     - CORS Options  
     - Dtos for Requests and Responses  
     - Custom Responses   
     - Password Hashing (BCrypt.Net-Next)  
     - Jwt (System.IdentityModel.Tokens.Jwt)  
   - Client  
     - JS for Frontend, Client with React Library  
     - Redux for State Management (with Redux-Thunk and Redux-Persist)  
     - Bootstrap Css Framework  
  
   ## CheckList:  
  
   - Validations:  
      - EMail Regex Check for User and Seller Accounts, when Creating and Updating.  
      - Unique Username and EMail check, for User and Seller Accounts, when Creating and Updating.  
      - Checking if the necessary input is Empty or not.  
      - Many more misc. checks (CreateCommentReply -> Comment belongs to the same Product? To User? Product belongs to the Seller?).  
   - Moved 'EntityServices' from Controllers to a new Layer(Service).  
   - Pagination. Added to the Table Component and also created a seperate Component.  
   - Sort By (Name, Price, DateCreated/Id (+Reversed)). Added to the Table Component and also created a seperate Component.  
   - New 'PagedResponse' Dto (with: success, message, data, sortInfo).  
   - Light / Dark mode for Store Front.  
   - Password Hashing.  
   - Jwt / Authorization / Authentication ; Full Auth for Admin and Seller fronts, partial for Store (Using cookies).  
   - Re-Routed all Fronts through their respective 'Main' components to check authorization.  
   - LogIn and Register Pages.  
   - Unique Layouts for all Fronts (used AdminLTE(in a very simple way) for Admin, simple Top and Side nav for Seller, 3 TopNavs and 1 Footer for Store) with a shared TopNav for 3Front Navigation.  
   - Added .env file for API Connections and Switch Cases for Actions.  
   - Dummy Pages in Store, so you can check the ProductList and SingleProduct page layout even if there isn't an API connection.  
   - NotFound pages (For each three Fronts and also a general purpose one), you can customise the Object name.  
   - Profile Page (Shared on All Fronts, Also by User and Seller accounts (With differentiating information)). Admin and Seller has single page, while store takes the id with useParams and shows the profile of the account with that id (Conditional editing).  
   - Cart Re-Implemented from previous project (a MiniCart to the Navbar and a table format for its own Page)  
   - Sub Profile pages for StoreFront (Cart, Orders, Comments), with Authorization check.  
   - SingleProductPage (has its own HttpRequest), with comment section.  
   - ProductCommentSection, only UserAccounts can Create and Like comments. CommentReply system (only the Seller of the Product is authorized to Create). Edit feature for Comments and CommentReplies, only for the writer.  
   - Added Toastify for alerts.  
  
   ## Future Plans:  
   (For this or future Projects)  
  
   - Unique URLs  
   - EMail Notification for Orders (It might be implemented but it will probably be disabled.)  
   - Account Personal MailBox  
   - Mails between Accounts  
   - Notifications for Personal EMail and in Account MailBox (Replies to Comments, Comments to Products, Order Status Update...)  
   - DDD with CQRS (with MediatR and AutoMapper) => I will probably implement this on the next project.  
   - Debounce for Text-Inputs  
   - Infinite Scrolling  
   - Breadcrumbs  
  
   ## Need To Think:  
  
   - More optimization for Delete/deActivate interactions. For Example; When a Product gets deleted, Orders tied to it should change to 'Status: 0', which should mean 'Cancelled', instead of being deleted along with it.  
  
   ## Flaws:  
  
   - In One to Many relationships, I put 'One's 'Name' in 'Many's properties. So when I request a 'Product' entity for example, I also get the name of 'Category' it belongs to, which is a 'One' of 'Many' Products. I did it independently, as such, if the 'One's name, changes, it won't affect and 'update' for the 'Many's. They will still show the old 'Name' of the 'One'. It should be fixable with propper mapping, requesting the 'Name' of 'One' each time the 'Many' is called instead of adding it as a property.  
   - Order Actions for Users and Sellers, since I am using my own 'Table' component, I can't really show the Orders Status verbally ('Cancelled' or 'Received') instead of CodeNumbers, by making it conditional.  
   - Not using the 'Discount' prop on Orders/Product at the moment (It IS implemented inside API/Services, if you send the discount property, it will work. I just didn't showcase it).  
   - Not making a relation between Orders and Product's -> Stock property (Order started -> -1 Stock, Order Cancelled -> +1 Stock). Just needs a few lines inside OrderServices actions.  
  
   ## Database Relations:  
   - Root of the Arrow represents 'One' and Tip represents 'Many'.  
  
  <img alt="Database-Relations" src="/Database/DB from 21-04-2022.jpeg">
  
   ## Starting The Project:  
  
   - API  
  
     - Use Visual Studio 2022 (Older versions may cause problems).  
     - Open up the ECommerceProject/API folder inside Visual Studio, instead of the whole project.  
     - Don't forget the nuGet packages. (Solution Explorer -> Right Click on the Solution -> Restore NuGet packages).  
     - Right Click on the ECommerceProject/API/Presentation/API project -> Set as Startup Project.  
     - You can start the server by clicking the Green Play button at the top of the window. If it says '> API', its Kestrel server. If its 'IIS Express'.  
     - Make sure the URLs match. Client should be open at http://localhost:3000 or http://localhost:3001. If not, you need to go to ECommerceProject/API/Presentation/API/Program and change the CORS options.  
     - If you are starting the API with Kestrel (https://localhost:7000), you don't need to change anything. But if you are using the IIS (https://localhost:44300), you need to do a similiar thing in Client. Go to the ECommerceProject/Client/.env file and change the REACT_APP_DATABASE to Local_Kestrel. You need to restart the servers for the settings to take effect.  
  
   - Client  
  
     - Use Visual Studio Code.  
     - Open up the ECommerceProject/Client Folder inside Visual Studio Code, instead of the whole project.  
     - Don't forget the npm libraries (Run 'npm install' in terminal to download all necessary files).  
     - Run 'npm start' to start the Client.  
     - Make sure the URLs match. Client should be open at http://localhost:3000 or http://localhost:3001. If not, you need to go to ECommerceProject/API/Presentation/API/Program and change the CORS options.  
     - If you are starting the API with Kestrel (https://localhost:7000), you don't need to change anything. But if you are using the IIS (https://localhost:44300), you need to do a similiar thing in Client. Go to the ECommerceProject/Client/.env file and change the REACT_APP_DATABASE to Local_Kestrel. You need to restart the servers for the settings to take effect.  
  
   - Database  
  
     - Use Microsoft SQL Server Management Studio if you want to use the Database I put with Dummy Data.  
       - Go to the Microsoft SQL Server Management Studio and connect to '(localdb)\MSSQLLocalDB'. If you can't, open up the "cmd" in your computer, type 'sqllocaldb info'. If you can see the 'MSSQLLocalDB', write 'sqllocaldb start MSSQLLocalDB'. Now go back to the Microsoft SQL Server Management Studio and try to connect to '(localdb)\MSSQLLocalDB' again. If it didn't work, Google the error it gives or create your own Database by following the below step.  
       - If you are connected, right click on the 'Databases' under '(localdb)\MSSQLLocalDB' and click 'Attach', find the Database file inside ECommerceProject/Database folder and attach it.  
       - Now you should be using the Dummy Data and the database.  
     - If it didn't work, or if you prefer to use a clean database, you can create your own. Go to the Visual Studio, with your ECommerceProject/API folder open. Go to the 'Package Manager Console' (Tools -> NuGet Package Manager -> Packet Manager Console). On the 'Default project', choose 'Persistence'. Then write 'add-migration mig-1' (you can change the 'mig-1' to your preffered name). After it's done, write 'update-database'. After that's done too, you should have your own Database files, usually located in %USERPROFILE% folder. You can change them with the Dummy Data files provided if you want to (You may need to cut the connection first).  
