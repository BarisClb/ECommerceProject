# ECommerceProject - Client  
  
  ### Languages:  
  
  Bu yazının Türkçe versiyonunu okumak için [buraya](https://github.com/BarisClb/ECommerceProject/blob/main/Client/README_TR.md) tıklayabilirsiniz.  
  
   ## Notes:  
  
   - Table:  
  
     - It's like my child. Instead of using a plug-in DataTable, I built one myself from scratch. If you check my previous works, you can see that I used this in other React Projects too. What's cool about this is that it changes in every project, always getting new features and adaptations to the current needs. It was much more simple before, It still had all the custom buttons and the search function (Although it was only for the table data, now it searches in Database) but also a parameter of 'isCategory', which made it function two ways, either as a CategoryList or something else (which was, back then, a ProductList). For the last project, I gave it a MiniCart button. Now I will move that somewhere else and instead, it will get sorting options and pagination(added a nice little logic when pageCount goes above 10, check it if you can). As I am learning more and more about programming, it also keeps growing, with me...  
  
   - Forms:  
  
     - CategoryForms: The 'Select' option here was my first attempt at 'GetTheEntityToChange'. Later, I implemented the 'GetTheEntityById' option I used for the other Forms. The problem with 'Select' is, with Pagination, you can only get the Entities on the current Page as options. Since its 'Categories', there shouldn't be more than a Single Page of them but, the real reason I left that one as it was, is that I just wanted to have a different variation.  
  
     - Forms: Using \<form /> in React; I think it's good practice to declare/describe/label/comment our intentions, even if there is no benefit to it. I don't see any benefits to wrapping my ModalForms with \<form />\</form> but, just to have different variations, I used both a wrapped version and an unwrapped version. Another thing to note is that the 'FindEntity' function also closes the Modal, which forces us to do another "event.preventDefault()". It's not hard to do but in the end, it is some extra work that which (I think) doesn't provide any benefits. We have 3 different FormTypes, "Create", "Update", and "Delete". Create uses the \<form>\</form> wrapping, "Update" also uses it, with 'FindEntity'.preventDefault(), "Delete" on the other hand, doesn't use it.  
        - Note-From-The-Future: So, one thing I didn't realize when I made the above comment is that I also have to use e.preventDefault() for the close button, even though it doesn't have the 'type=submit' attribute. I didn't check for this possiblity when I created forms with 'form' element and it would submit the form when you click on the close button.  
  
   - AdminLTE:  
  
     - I will delete some files from the 'public/adminLTE' because they are taking too much space for something I make so little use of. I will replace it with the CDN but If it looks or behaves in a weird way, that's probably the reason for it.  
       - Update: I commented the \<script /> CDN because I don't even use it (for now at least).  
