$(function(){

  const root = document.getElementById("categories");
  const showcase = document.getElementById("show");  
  const youtube = document.getElementById("youtube");
  function addCat(source, text, val)
  {
    let container = document.createElement("div");
    container.classList.add("image");
    container.classList.add("col-12");
    container.classList.add("col-md-6");
    container.classList.add("col-lg-4");
    container.classList.add("col-xl-3");
    container.classList.add("mt-2");
    container.setAttribute("id", text);
    container.setAttribute("id2", val);
    root.append(container);

    let img = document.createElement("img");
    img.src = source;
    img.classList.add("imgs");
    container.append(img);

    let overlay = document.createElement("div");
    overlay.classList.add("overlay");
    overlay.classList.add("image_overlay");
    container.append(overlay);

    let overlayTitle = document.createElement("div");
    overlayTitle.classList.add("title");
    overlay.append(overlayTitle);

    let title = document.createTextNode(text);
    overlayTitle.appendChild(title);

  }

  function addCmealdetail(source, text, link, ingredient)
  {
    let doc = document.createElement("div");
    doc.classList.add("container")
    doc.setAttribute("id", "wrapper");
    root.append(doc); 

    let image = document.createElement("img");
    image.classList.add("imgs");
    image.classList.add("col-12");
    image.classList.add("col-sm-6");
    image.src = source;
    doc.append(image);

    let txt = document.createElement("div");
    txt.classList.add("texts");
    doc.append(txt)

    $(".texts").append("<h2>Instructions</h2>");


     textss = text.split('\r\n');
    
    for (let i = 1; i < textss.length; i++) {
      $(".texts").append("<p>" + textss[i] + "</p>");
    }

    let utube = document.createElement("div");
    utube.classList.add("utubes")
    utube.setAttribute("id", "utubevid");
    youtube.append(utube);
    }

  function nextComp(category)
  {
    $.ajax({
      url:'https://www.themealdb.com/api/json/v1/1/filter.php?c='+category,
      method:'GET',
      dataType: 'json',
      success:function(data) {
        let meal = data.meals;
        $.each(meal, function (index, value) { 
          addCat(value.strMealThumb, value.strMeal, value.idMeal);
        });
        $(".image").click(function () { 
          category = $($(this)).attr("id2");
          categorys = $($(this)).attr("id");
          $("#crumbs").after('<span id="increase">  /  ' + categorys + '</span>')

          $("h2").remove();
          $("hr").remove();
          const titles = '<h2 id="fdtitle">'+ categorys +'</h2> <hr></hr>';
          $("#foodtitle").append(titles);

          while(root.lastChild)
          {
            root.removeChild(root.lastChild);
          }
          nextComp2($($(this)).attr("id2"));
        })
      }
    });
  }

  function nextComp2(mealid)
  {
    $.ajax({
      url:'https://www.themealdb.com/api/json/v1/1/lookup.php?i='+ mealid,
      method:'GET',
      dataType: 'json',
      success:function(data) {
        arr = [];
        let meal = data.meals;
        $.each(meal, function (index, value) { 
          addCmealdetail(value.strMealThumb, value.strInstructions, value.strYoutube);
        });
      },

    });
    $("#crumbs").click(function(){

      root.removeChild(root.lastChild);

    nextComp($($(this)).attr("id2"));
    $("#increase").remove();
    })
  }


  $.ajax({
    url:'https://www.themealdb.com/api/json/v1/1/categories.php',
    method:'GET',
    dataType: 'json',
    success:function(data) {
      let cat = data.categories;
      $.each(cat, function (index, value) { 
          addCat(value.strCategoryThumb, value.strCategory);
      });
      
      $(".image").click(function () { 
        
        category = $($(this)).attr("id");
        categorya = $($(this)).attr("id");
        showcase.remove();
        
        const bread = '<ol class="breadcrumb"> <li class="breadcrumb-item active "><a href="index.html">Home</a></li> <li class="breadcrumb-item" ><a href="index.html">Foods</a></li> <li class="breadcrumb-item" aria-current="page" id="ftyp">'+' <a href="#" id="crumbs" id2=' + categorya + '>' +  category + '</a></li></ol>';

      $("#breadcrumbs").append(bread);
      const titles = '<h2 id="fdtitle">'+ category +'</h2> <hr></hr>';
      $("#foodtitle").append(titles);
        while(root.lastChild)
        {
          root.removeChild(root.lastChild);
          
        }

        nextComp($($(this)).attr("id"));

      });

      $("#home").click(function(){
        while(root.lastChild)
        {
          root.removeChild(root.lastChild);
          
        }
      })
    }
  });
});