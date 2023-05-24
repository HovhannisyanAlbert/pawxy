const button = document.querySelector("#button");
const body = document.querySelector(".body");
const input = document.querySelector("#input-box");
const prevButton = document.querySelector("#prev");
const nextButton = document.querySelector("#next");
const span = document.querySelector(".span")
const key = "AIzaSyD9jRQnBVzcy4WUvwx455ajYBZm3bk7tqE";
let data = {};





function getData(obj) {
 span.innerHTML = obj.pageInfo.totalResults + "total viideo"
  const newArr = [{ ...obj }];
 
  newArr.map((elem) => {
    elem.items.map((item) => {
      const div = document.createElement("div");
      div.addEventListener("click", () => {
        const href = item.id.videoId;

        body.innerHTML = `
        <iframe width="800" height="450" src="https://www.youtube.com/embed/${href}" frameborder="0" allowfullscreen>
        `;
      });
      div.classList.add("block_forYoutube");
      div.innerHTML = `
    <div class="inner_box">
        <img  src=${item.snippet.thumbnails.default.url} />
        <div class="text_box">
          <h2>${item.snippet.title}</h2>
          <h3>${item.snippet.channelTitle}</h3>
          <div class="info">
            <i class="fa-brands fa-youtube"></i>
            <span>youtube.com</span>
          </div>
        </div>
    </div>
`;

      body.append(div);
    });
  });
}

function DataFetch(pageToken, valueInput) {
  let requestOptions = {
    method: "GET",
    redirect: "follow",
  };
 

  if (pageToken) {
    
    fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${key}&q=${valueInput}&type=video&part=snippet&maxResults=10&pageToken=${pageToken}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => JSON.parse(result))
      .then((res) => {
        data = res;
     
        getData(data);
      })
      .catch((error) => console.log("error", error));
  } else {
    fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${key}&q=${valueInput}&type=video&part=snippet&maxResults=10`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => JSON.parse(result))
      .then((res) => {
        data = res;
        nextButton.disabled = false
        prevButton.disabled = false
        getData(data);
      })
      .catch((error) => console.log("error", error));
  }
}

button.addEventListener("click", () => {
  isChecked = true;
 
  body.innerHTML =""
   DataFetch(undefined, input.value);

});




  nextButton.addEventListener("click", () => {
    body.innerHTML = "";
    const { nextPageToken } = data;
  
 
     DataFetch(nextPageToken, input.value);


});



prevButton.addEventListener("click", () => {


     
    body.innerHTML = "";
    const { prevPageToken } = data;

    
  
     DataFetch(prevPageToken, input.value);
 

});


