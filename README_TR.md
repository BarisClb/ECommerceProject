# ECommerceProject  
    
  ### Anchor Links:
  
   - [Proje Yapısı](#proje-yapısı)  
   - [Yapılanlar Listesi](#yapılanlar-listesi)  
   - [Gelecek Planları](#gelecek-planları)  
   - [Düşünmem Gerekenler](#düşünmem-gerekenler)  
   - [Eksiklikler](#eksiklikler)  
   - [Database Iliskileri](#database-ilişkileri)  
   - [Projenin Çalıştırılması](#projenin-çalıştırılması)  
  
   ## Proje Yapısı:  
  
   Proje üzerinde çalışırken elimden geldiği kadar bu Standartlar/Uygulamalar/'En Iyi Pratikler'e sadık kalmaya çalıştım. Yazılım ve Kodlama yolunun henüz başlarında olduğum için, yürürken biraz tökezlemiş olabilirim fakat pes etmeden yoluma devam edeceğim ve zamanla bu hatalarımın hepsini kapatacağım. İnternetin sonu gözükmeyen kaynaklarından faydalanıp, kod yazarak öğrenmeye her geçen gün devam ediyorum!  
  
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
  
   ## Yapılanlar Listesi:  
  
   - Doğrulama (Denetim):  
      - User ve Seller Hesapları için Regex ile EMail (format -> ornek@email.com) denetimi.  
      - User ve Seller Hesapları için Username ve EMail'in 'eşsiz' (Hesaba özel) olma denetimi.  
      - Gerekli bilgilerin boş veya eksik olmamalarının denetimi.  
      - Ve bir çok ufak denetim (CreateCommentReply -> Comment aynı Product'e mi ait? Doğru User'a mı ait? Product doğru Seller'a mı ait?).  
   - EntityServisleri Controller'dan çıkararak kendi Layerlarına yerleştirdim.  
   - Sayfalama(Pagination). Table Component içerisine eklendi ve ayrıca kendi ayrı Component'ı oluşturuldu.  
   - Sıralama(Sort By) (İsim, Fiyat, Id, Tarih (+Tersten sıralama)). Table Component içerisine eklendi ve ayrıca kendi ayrı Component'ı oluşturuldu.  
   - Yeni 'PagedResponse' Dto'su (with: success, message, data, sortInfo).  
   - Store Bölümü için Light / Dark modu.  
   - Şifreyi depolarken 'Hash'leme.  
   - Jwt / Authorization / Authentication ; Admin ve Seller bölümleri için tam, Store için kısmi (Cookies kullanarak).  
   - Bütün bölümleri 'Main' Component'lar altında birleştirme (Authorization kontrolü için).  
   - GirişYapma ve KayıtOlma sayfaları.  
   - Her Site bölümü için özel Layout (Admin -> AdminLTE(en basit hali ile), Seller -> basit bir Top ve Side nav, Store -> 3 adet TopNav, 1 adet footer) ve hepsinin paylaştığı bir TopNav (Bölümler arası navigasyon için).  
   - Client altına .env dosyası (API bağlantıları ve API aksiyonlarındaki değişkenler tanımlandı).  
   - Store için Sahte-Veriler olan sayfalar (API bağlantısı olmasa bile listelemeyi görebilmek için).  
   - 'Sayfa Bulunamadı' Component'ı (Her bölüm için ayrı ayrı, bir tane de genel (bütün siteyi kapsayan)).  
   - Profil Sayfası (Her bölüm için ve ayrıca User ve Seller hesapları için ortak bir Component. (User ve Seller bilgileri hesaba özel olarak gösterilir.)). Admin ve Seller bölümü tek bir sayfaya sahip, Store is url kısmında girilen id'ye göre hesap bilgileri getiriyor (Hesap bilgilerini değiştirme tuşu ise sadece giriş yapan kullanıcı için söz konusu).  
   - Sepet tekrar eklendi (Eski projelerde de kullanmıştım). Ayrıca Store TopNav için bir MiniSepet tuşu eklendi.  
   - Profil-Alt sayfaları (Sepet, Sipariş-Listesi, Yorum-Listesi), Authorization kontrolü ile.  
   - Ürün sayfası eklendi.  
   - Ürün sayfasına yorumlar kısmı eklendi. Sadece User hesapları yorum yapabilir ve diğer yorumları beğenebilir. Sadece gösterilen ürünü listeleyen Seller hesabı, bu yorumlara cevap yazabilir. Bu yorum ve cevapları düzenleme yetkisi, sadece yazarlara aittir.  
   - Uyarı mesajları için Toastify eklendi.  
  
   ## Gelecek Planları:  
   (Bu veya gelecekteki projeler için)  
  
   - Id yerine Entity'e özel URL'ler  
   - Siparişler için EMail yolu ile bilgilendirme sistemi    
   - Hesaplara özel mail kutusu  
   - Hesaplar arası mesajlaşma (Özel mail kutusu aracılığı ile)  
   - Hem site içi mail kutusu, hem de kişisel email aracılığı ile bilgilendirme sistemi (Yorumlarına beğeni veya cevap geldiği zaman, vs...)  
   - DDD ve CQRS (MediatR ve AutoMapper ile birlikte) => Bir sonraki proje için düşünüyorum.  
   - Yazı 'Input'ları için Debounce  
   - Infinite Scrolling  
   - Breadcrumbs  
  
   ## Düşünmem Gerekenler:  
  
   - Entityleri 'Silmek' yerine 'İnaktif' hale getirmek. Bu çeşit bir durum SiparişEntity'lerde mevcut, OrderStatus => 0 -> İptal, 1 -> İşleme alındı, 2 -> Yollandı, 3 -> Teslim Edildi.  
  
   ## Eksiklikler:  
  
   - Bir'e - Çok'lu ilişkilerde, 'Bir'in ismini 'Çok'un içine property olarak. depoladım, bu sebeple 'Çok' bir entity talep ettiğimde, örneğin Ürün, onun bağlı olduğu 'Tek'in, yani kategorinin, ismini de elde ediyorum. Fakat bu 'ayrıca' depolandığı için (herhangi bir bağ bulunmadığından), 'Tek'in ismi değişirse bu durum 'Çok'un içindeki ismi değiştirmeyecek. Bu durumu düzeltmek için 'Mapping' işlemi ile, 'Çok'u talep ederken 'Tek'i de bulup, adını Dto içerisine yerleştirebiliriz (Bu durumda neden depoladık? Daha iyi bir yöntemi var mı? Şu an için Id'sini depolıyoruz ve bunu yapmamız şart. Ayrıca da adı depolanabilir mi? EFCore içerisinde bu yolu bulamadım.).   
   - Sipariş Listelemerinde, kendi Table Component'ımı kullandığım için SiparişDurumu'nu yazılı olarak (koşula bağlı bir şekilde; 0 ise 'İptal', 2 ise 'Yolda' vs.) gösteremiyorum.  
   - Product içerisine İndirim property'si koydum fakat sitede kullanmadım (Logic API'de mevcut, discount gönderilirse işleme konur).  
   - Siparişlerin Ürünlerin Stock property'sini etkilemesini sağlamadım (Sipariş verildiğinde -1 azalsın, İptal edildiğinde tekrar +1 artsın vs.). Sadece OrderServices işlemlerine birkaç satır eklenecek.  
  
   ## Database Ilişkileri:  
   - Okun kök kısmı 'Tek'i, uç kısmı 'Çok'u temsil ediyor.  
  
  <img alt="Database-Relations" src="/Database/DB from 21-04-2022.jpeg">
  
   ## Projenin Çalıştırılması:  
  
   - API  
  
     - Visual Studio 2022 kullanın (Eski versiyonları sorunlara yol açabilir).  
     - ECommerceProject/API dosyasını Visual Studio ile açın (Dikkat, bütün proje klasörünü değil, yalnıza API'yi).  
     - NuGet paketlerini yüklemeyi unutmayın. (Çözüm Gezgini -> ''API' çözümü'ne sağ tıkla -> NuGet Paketlerini Geri Yükle).  
     - ECommerceProject/API/Presentation/API projesine sağ tıkla -> Başlangıç Projesi Olarak Ayarla.  
     - Yukarıdaki yeşil tuşa basarak API'yi başlatın. Eğer '> API' yazıyorsa Kestrel, 'IIS Express' yazıyorsa IIS serverıdır.  
     - URL'lere dikkat edin. Client, http://localhost:3000 ya da http://localhost:3001 adreslerinden birinde açılmalı. Aksi halde ECommerceProject/API/Presentation/API/Program gidip CORS ayarlarını değiştirmeniz gerekir.  
     - Eğer API'yi Kestrel server ile başlatıyorsanız (https://localhost:7000), bir değişiklik yapmanıza gerek yok. Ancak IIS kullanıyorsanız (https://localhost:44300), Yukarıdaki ayarın benzerini Client tarafında yapmanız gerekiyor. ECommerceProject/Client/.env dosyasına gidin ve REACT_APP_DATABASE'in karşısındaki değeri Local_Kestrel olarak değiştirin. Ayarların devreye girmesi için, eğer çalışıyorsa, Clientı tekrar başlatmayı unutmayın (VSCode terminalince ctrl+c tuşuna basıp, onay kısmında y tuşuna basıp enter'a tıklayın).  
  
   - Client  
  
     - Visual Studio Code kullanın.  
     - ECommerceProject/Client klasörünü Visual Studio Code ile açın (Dikkat, bütün proje klasörünü değil, yalnıza API'yi).  
     - Npm kütüphanelerini yüklemeyi unutmayın (VSCode terminalinde 'npm install' yazarak bütün gerekli doslayarı indirin).  
     - VSCode terminalinde 'npm start' yazarak Client'ı çalıştırın.  
     - URL'lere dikkat edin. Client, http://localhost:3000 ya da http://localhost:3001 adreslerinden birinde açılmalı. Aksi halde ECommerceProject/API/Presentation/API/Program gidip CORS ayarlarını değiştirmeniz gerekir.  
     - Eğer API'yi Kestrel server ile başlatıyorsanız (https://localhost:7000), bir değişiklik yapmanıza gerek yok. Ancak IIS kullanıyorsanız (https://localhost:44300), Yukarıdaki ayarın benzerini Client tarafında yapmanız gerekiyor. ECommerceProject/Client/.env dosyasına gidin ve REACT_APP_DATABASE'in karşısındaki değeri Local_Kestrel olarak değiştirin. Ayarların devreye girmesi için, eğer çalışıyorsa, Clientı tekrar başlatmayı unutmayın (VSCode terminalince ctrl+c tuşuna basıp, onay kısmında y tuşuna basıp enter'a tıklayın).   
  
   - Database  
  
     - Eğer isterseniz, Microsoft SQL Server Management Studio kullanarak benim hazırladığım içerisinde Sahte-Veriler olan hazır database dosyasını kullanabilirsiniz.  
       - Microsoft SQL Server Management Studio programına gidin ve '(localdb)\MSSQLLocalDB'e bağlanın(Connect). Eğer hata alıyorsanız, bilgisayarınızda 'cmd'yi açın, 'sqllocaldb info' yazın. Eğer 'MSSQLLocalDB' yazısını gördüyseniz, 'sqllocaldb start MSSQLLocalDB' yazın. Şimdi Microsoft SQL Server Management Studio programına tekrar gidin ve '(localdb)\MSSQLLocalDB'e tekrar bağlanmaya(Connect) çalışın. Yine işe yaramadıysa, Aldığınız hatayı Google'da aratın veya aşağıda yazdığım şekilde kendi database dosyanızı yaratın.  
       - Eğer bağlandıysanız, '(localdb)\MSSQLLocalDB' altındaki 'Databases'e sağ tıklayın ve Bağla'ya(Attach) tıklayın, ECommerceProject/Database klasörü içerisine eklediğim Database dosyasını bulun ve 'Bağla'yın.  
       - Başarılı oluysanız, kurduğunuz API ve Client bu database i kullanıyor olmalı.  
     - Eğer işe yaramadıysa ya da kendiniz, sıfırdan bir database yaratmak istiyorsanız; Yine ECommerceProject/API dosyası açık bir şekilde Visual Studio'ya gidin. 'Paket Yöneticisi Konsolu' (Araçlar -> NuGet Paket Yöneticisi -> Paket Yöneticisi Konsolu). 'Varsayılan Proje' kısmında 'Persistence'ı seçin. Daha sonra terminale 'add-migration mig-1' ('mig-1' yazısını tercih ettiğiniz bir isme çevirebilirsiniz). Terminal işlemkeri bittikten sonra, 'update-database' yazın. Bu işlemler de bittikten sonra, eğer hata almadıysanız, kendi database'inizi oluşturmuşsunuz demektir. Bu dosyalar genelde %USERPROFILE% klasörü içerisinde yer alır. Eğer isterseniz proje içerisinde kendi oluşturduğum dosyaları üstlerine kopyalayarak yerlerini değiştirebilirsiniz. (Database'in bağlantısını keserek kullanımda olmadığından emin olun).  
