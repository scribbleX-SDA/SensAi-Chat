var memoryValue = "";

function init() {
	align();
	set_chat_title_edit_icon();

	document.querySelectorAll(".temp-control-unit").forEach((e)=>{
		e.onclick = ()=>{
			if(!e.classList.contains(".active-temp")){
				document.querySelector(".active-temp").classList.remove("active-temp");
				e.classList.add("active-temp");
				user_info.temp = e.getAttribute("temp");
			}
		}
	});

    document.getElementById("new-convo").onclick = ()=>{
        document.getElementById("chats-container").innerHTML = "";
        memoryValue = "";
        document.getElementById("chat-title").innerHTML = "New Chat";
        fetch(`https://sensai.slxdev.tech/conversations?user=${getCookie("user")}`)
    	.then(
    		data => data.text()
    	)
    	.then((data) => {
    		console.log(JSON.parse(data));
    		data = JSON.parse(data);
    		if (data.length > 0) {
    			// document.getElementById("no-convo-message").style.display = "none";
    			console.log(data[0]);
    			var htm = "";
    			data.forEach((convo) => {
    				// convo = data[i];
    				template = `<div class="conversation-model" chat-id="${convo.conversation_id}">
                                <div class="conversation-title" onclick="callConversation(this)">
                                    ${convo.title}
                                </div>
                                 <img src= "assets/icons/pencil.png" class="convo-title-edit-icon" onclick="edit_chatTitle(this)"/>
                            </div>`
    
    				htm += template;
    			});
    			document.getElementById("conversations-container").innerHTML = htm;
                refresh_title_edit_buttons();
    		}
    	})
        // .then(()=>{
        //     document.querySelectorAll(".conversation-model").forEach((e)=>{
        //         e.oncontextmenu = (e)=>{
        //             e.preventDefault();
        //             deleteCont = document.getElementById("delete-convo");
        //             deleteCont.style.top = e.clientY+"px";
        //             deleteCont.style.left = e.clientX+"px";
        //             deleteCont.style.visibility = "visible";
        //         }
        //     })
        // })
    	.catch(error => {
    		console.error(error);
    	})
        
    }

    fetch(`https://sensai.slxdev.tech/balance?user=${getCookie("user")}`)
    .then(response => response.text())
    .then((data)=>{
        document.getElementById("balVal").innerHTML = JSON.parse(data).balance;
    })
}

init();

function align() {
	$("#root").width($("#container").width() - $("#left-menu-bar").width() - 2);
	$("#containers").height($("#root").height() - $("#header").height() - 2);
}

// function set_chat_title_edit_icon(){
//     var icon = document.getElementById("edit-chat-pencil");
//     var container = document.getElementById("chat-title");
//     icon.style.left = $(container).width() + 60 + "px";
// }

function set_chat_title_edit_icon() {
	// var icon = document.getElementById("edit-chat-pencil");
	var container = document.getElementById("chat-title");
	// icon.style.left = $(container).width() + 60 + "px";
}


// document.getElementById("edit-chat-pencil").onclick = ()=>{
//     document.getElementById("chat-title-change-div").style.display = "block";
// }
// document.getElementById("close-chat-title-edit-div").onclick = ()=>{
//     document.getElementById("chat-title-change-div").style.display = "none";
// }
// document.getElementById("icon").onclick = () => {
//   document.getElementById("conversation-icon").removeAttribute('readonly');
// }




document.getElementById("message-input-field").onkeyup = (e) => {
	if (e.key == "Enter") {
		initConvo();
	}
}

function edit_chatTitle(e){
    // title = "Hello"
    conversation_id = e.parentElement.getAttribute("chat-id")
    beginning_title = "";
    elm = document.createElement("input");
    elm.classList.add("edit-chat-title")
    elm.value = e.parentElement.children[0].innerHTML;
    elm.value = elm.value.replace(/^\s*[\r\n]/gm, '').replace(/\s*[\r\n]$/gm, '').trim();
    e.parentElement.replaceChild(elm, e.parentElement.children[0]);
    beginning_title = elm.value;
    // alert(beginning_title);
    var x = 0;
    elm.onkeyup = (a)=>{
        if(a.key == "Enter"){
            if(elm.value !== ""){
                valLen = elm.value.length;
                for(var i=0; i<valLen; i++){
                    if(elm[i] == ""){
                        x++;
                    }
                }
                if(x == valLen){
                    alert("Apologies, but the name cannot contain only spaces.");
                }else{
                    el_val = elm.value;
                    el = `<div class="conversation-title" onclick="callConversation(this)">
                            ${el_val}
                        </div>`;
                    e.parentElement.innerHTML = el+e.parentElement.innerHTML;
                    refresh_title_edit_buttons();
                  fetch(`https://sensai.slxdev.tech/uct?user=${getCookie("user")}&idval=${conversation_id}&newtitle=${el_val}`)
                  .then(response => response.json())
                  .then((data) => {
                      if(data.status == true){
                          console.log("Update Successful");
                      }
                  })
                  .catch(error => console.error(error));
                    elm.remove();
                  // user, prevtitle, newtitle
                    // https://sensai.slxdev.tech/uct
                }
            }else{
                el = `<div class="conversation-title">
                        ${beginning_title}
                    </div>`;
                elm.remove();
                e.parentElement.innerHTML = el+e.parentElement.innerHTML;
                refresh_title_edit_buttons();
            }
        }
    }
}

function initConvo(){
    msg = document.getElementById("message-input-field").value;
		dom = document.getElementById("chats-container");
		// template = `<div class="message-container">
		// <img src="${user_info.icon}" alt="" class="client-message-icon">
		// <div class="client-message">${msg}</div>
		// </div>`;
		var parent = document.createElement("div");
		parent.classList.add("message-container");
		var child = document.createElement("div");
		child.classList.add("client-message");
		child.innerHTML = msg;
		parent.innerHTML = `<img src="${user_info.icon}" alt="" class="client-message-icon">`;
		parent.appendChild(child);
		document.getElementById("message-input-field").value = "";

		dom.appendChild(parent);
		$(parent).height($(child).height() + 20);
		setTimeout(() => {
			dom.scrollTop = dom.scrollHeight;
		}, 0);

    var load_elm = document.createElement("div");
        setTimeout(()=>{
            load_elm.classList.add("load-animation");
            load_elm.innerHTML = `<div id="preloader">
                                      <div id="loader"></div>
                                    </div>`;
            dom.appendChild(load_elm);
            dom.scrollTop = dom.scrollHeight;
        }, 500);


		// Create the URL with the API endpoint and parameters
		let url = "https://sensai.slxdev.tech/cerberus?prompt=" + encodeURIComponent(msg) + "&temp=" + user_info.temp;

		if (memoryValue !== "") {
			url += "&memory=" + encodeURIComponent(memoryValue);
		}

		// Set the authorization header with the API key
		const apiKey = getCookie("user");
		const headers = {
			Authorization: apiKey
		};



		// Make the API request with fetch
		fetch(url, {
				headers: headers
			})
			.then(response => response.json())
			.then(data => {
                load_elm.remove();
				// Do something with the API response data
				console.log(data);
                if(memoryValue === ""){  memoryValue = data.response.memory;  }
                // memoryValue = memoryValue.toString();
                document.getElementById("balVal").innerHTML = data.balance;
				createAIMessage(data.response.text.message)
			})
			.catch(error => {
				// Handle any errors that occurred during the API request
				console.error(error);
			});
}

// Request to get User History

temp = encodeURIComponent(getCookie("user"));

fetch(`https://sensai.slxdev.tech/conversations?user=${getCookie("user")}`)
	.then(
		data => data.text()
	)
	.then((data) => {
		console.log(JSON.parse(data));
		data = JSON.parse(data);
		if (data.length > 0) {
			document.getElementById("no-convo-message").style.display = "none";
			console.log(data[0]);
			var htm = "";
			data.forEach((convo) => {
				// convo = data[i];
				template = `<div class="conversation-model" chat-id="${convo.conversation_id}">
                            <div class="conversation-title" onclick="callConversation(this)">
                                ${convo.title}
                            </div>
                             <img src= "assets/icons/pencil.png" class="convo-title-edit-icon" onclick="edit_chatTitle(this)"/>
                        </div>`

				htm += template;
			});
			document.getElementById("conversations-container").innerHTML = htm;
            refresh_title_edit_buttons();
		}
	})
    // .then(()=>{
    //     document.querySelectorAll(".conversation-model").forEach((e)=>{
    //         e.oncontextmenu = (e)=>{
    //             e.preventDefault();
    //             deleteCont = document.getElementById("delete-convo");
    //             deleteCont.style.top = e.clientY+"px";
    //             deleteCont.style.left = e.clientX+"px";
    //             deleteCont.style.visibility = "visible";
    //         }
    //     })
    // })
	.catch(error => {
		console.error(error);
	})




function createAIMessage(msg) {
    var dom = document.getElementById("chats-container");
    if(msg == "clear"){
        msg = "Preparing to clear the conversation data.";
        setTimeout(()=>{
            dom.innerHTML = "";
            memoryValue = "";
            createAIMessage("Conversation is cleared :)");
        }, 5000);
    }
	msg = respTohtml(msg);
	var parent = document.createElement("div");
	parent.classList.add("message-container");
	var child = document.createElement("div");
	child.classList.add("ai-message");
	child.innerHTML = msg;
	parent.innerHTML = `<img src="assets/icons/bot.png" alt="" class="ai-message-icon">`;
	parent.appendChild(child);
	document.getElementById("message-input-field").value = "";

	dom.appendChild(parent);
	$(parent).height($(child).height() + 20);

	setTimeout(() => {
		dom.scrollTop = dom.scrollHeight - 100;
        // console.log(dom.scrollHeight);
	}, 0);
}

function respTohtml(responseText) {
	// Assume `responseText` contains the text returned by GPT-3
	let responseHtml = responseText;
	// Convert plain URLs to anchor tags
	responseHtml = responseHtml.replace(/(https?:\/\/[^\s<]+(\.[^\s<]+)+[^<.,:;"')\]\s])/ig, '<a href="$1">$1</a>');
	// Convert email addresses to mailto: links
	responseHtml = responseHtml.replace(/\b([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,})\b/g, '<a href="mailto:$1">$1</a>');
	// Use highlight.js to highlight code blocks
	responseHtml = responseHtml.replace(/```([^\n]+)?\n([\s\S]+?)\n```/g, function(match, language, code) {
		if (language && hljs.getLanguage(language)) {
			hljs.addPlugin(new CopyButtonPlugin());
			return '<pre><code class="hljs ' + language + '">' + hljs.highlight(code, {
				language
			}).value + '</code></pre>';
		} else {
			hljs.addPlugin(new CopyButtonPlugin());
			return '<pre><code class="hljs">' + hljs.highlightAuto(code).value + '</code></pre>';
		}
	});

	// Convert newlines to <br> tags
	responseHtml = responseHtml.replace(/\n/g, '<br>');

	// Wrap the HTML in a <div> tag with a class of "response"
	responseHtml = '<div class="response">' + responseHtml + '</div>';
	return responseHtml;
}

document.getElementById("send").onclick = ()=>{
    initConvo();
}


function refresh_title_edit_buttons(){
    document.querySelectorAll(".conversation-model").forEach((convo)=>{
        convo.onmouseover = ()=>{
            convo.querySelector("img").style.visibility = "visible";
        }
        convo.onmouseout = ()=>{
            convo.querySelector("img").style.visibility = "hidden";
        }
    });
}


function createUserMessage(message){
    dom = document.getElementById("chats-container");
    var parent = document.createElement("div");
    parent.classList.add("message-container");
    var child = document.createElement("div");
    child.classList.add("client-message");
    child.innerHTML = message;
    parent.innerHTML = `<img src="${user_info.icon}" alt="" class="client-message-icon">`;
    parent.appendChild(child);
    document.getElementById("message-input-field").value = "";

    dom.appendChild(parent);
    $(parent).height($(child).height() + 20);
}

// function callConversation(e){
//     var conversation_id = e.parentElement.getAttribute("chat-id");
//     console.log(conversation_id);
//     url = "https://sensai.slxdev.tech/call_convo?user="+getCookie("user")+"&convo="+conversation_id;
//     fetch(url)
//     .then(response => response.text())
//     .then((data)=>{
//         data = JSON.parse(data);
//         console.log(data);
//         memoryVal = conversation_id;
//         console.log(data.length);
//         console.log(data);
//         var interval = null;
//         for(obj in data){
//             // interval = setInterval(()=>{
//             // interval = setInterval(()=>{
//                 if(data[obj].sender === "user"){
//                     createUserMessage(data[obj].text);
//                 }else{
//                     createAIMessage(data[obj].text);
//                 }
//             // }, obj*200);
//             // }, 200);
//         }
//     })
// }


// function callConversation(e) {
//     var conversation_id = e.parentElement.getAttribute("chat-id");
//     console.log(conversation_id);
//     url = "https://sensai.slxdev.tech/call_convo?user=" + getCookie("user") + "&convo=" + conversation_id;
//     fetch(url)
//         .then(response => response.text())
//         .then((data) => {
//             data = JSON.parse(data);
//             console.log(data);
//             memoryVal = conversation_id;
//             console.log(data.length);
//             console.log(data);

//             var i = 0;
//             var interval = setInterval(() => {
//                 if (i < data.length) {
//                     if (data[i].sender === "user") {
//                         createUserMessage(data[i].text);
//                     } else {
//                         createAIMessage(data[i].text);
//                     }
//                     i++;
//                 } else {
//                     clearInterval(interval);
//                 }
//             }, 100);
//         })
// }


async function callConversation(e) {
    document.getElementById("chats-container").innerHTML = "";
    var conversation_id = e.parentElement.getAttribute("chat-id");
    console.log(conversation_id);
    url = "https://sensai.slxdev.tech/call_convo?user=" + getCookie("user") + "&convo=" + conversation_id;
    fetch(url)
        .then(response => response.text())
        .then(async (data) => {
            data = JSON.parse(data);
            console.log(data);
            memoryValue = conversation_id;
            // console.log(memoryVal);
            // console.log(data.length);
            // console.log(data);
            document.getElementById("chat-title").innerHTML = e.innerHTML;
            setTimeout(()=>{
                $("#edit-chat-pencil").css("left", $("#chat-title").width() + 50 + "px"); 
            }, 10);

            for (let obj of data) {
                await new Promise(resolve => setTimeout(resolve, 100));
                if (obj.sender === "user") {
                    createUserMessage(obj.text);
                } else {
                    createAIMessage(obj.text);
                }
            }
        })
}
