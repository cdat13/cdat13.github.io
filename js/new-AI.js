// Toggle chatbox visibility
const chatIcon = document.getElementById('chat-icon');
let chatboxLoaded = false;

chatIcon.addEventListener('click', () => {
    let chatbox = document.getElementById('chatbase-embed');

    // Nếu chưa có iframe, tạo ra
    if (!chatbox) {
        chatbox = document.createElement('iframe');
        chatbox.id = 'chatbase-embed';
        chatbox.src = 'https://www.chatbase.co/embed.min.js';
        chatbox.allow = 'microphone; camera';
        document.body.appendChild(chatbox);
        chatboxLoaded = true;
    }

    // Toggle hiển thị
    chatbox.style.display = chatbox.style.display === 'block' ? 'none' : 'block';
});

// Load script Chatbase chính thức
(function(){
    if(!window.chatbase || window.chatbase("getState") !== "initialized"){
        window.chatbase = (...args) => {
            if(!window.chatbase.q){ window.chatbase.q=[] }
            window.chatbase.q.push(args);
        };
        window.chatbase = new Proxy(window.chatbase,{
            get(target, prop){
                if(prop==="q"){ return target.q }
                return (...args)=> target(prop,...args);
            }
        });
    }

    const onLoad = function(){
        const script = document.createElement("script");
        script.src = "https://www.chatbase.co/embed.min.js";
        script.id = "ava3L8aybzyWxUy4986p5";
        script.domain = "www.chatbase.co";
        document.body.appendChild(script);
    };

    if(document.readyState==="complete"){
        onLoad();
    } else {
        window.addEventListener("load", onLoad);
    }
})();
