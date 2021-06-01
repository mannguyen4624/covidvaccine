function readCookie() {
    if (document.cookie.length > 0) {
        let response = document.cookie.split("=")[1];
        window.location.href = `${response}.html`;
    }
}

let url = 'https://desolate-wave-83957.herokuapp.com/';

document.onclick = function (event) {
    if (event === undefined) event = window.event;
    const target = 'target' in event ? event.target : event.srcElement;

    if (target.classList.contains("yes")) {
        document.cookie = "response=yes";
        let updateUrl = url.concat("yes");
        fetch(updateUrl);
        window.location.href = "yes.html";
    } else if (target.classList.contains("no")) {
        document.cookie = "response=no";
        let updateUrl = url.concat("no");
        fetch(updateUrl);
        window.location.href = "no.html";
    }
}



function getData(fromYes) {
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonResponse) {
            if (fromYes) {
                document.getElementById("yes").innerText = `You are now 1 out of ${jsonResponse.yes} people who have gotten the Covid vaccine. :)`;
                document.getElementById("no").innerText = `On the other hand, ${jsonResponse.no} people have not.`;
            } else {
                document.getElementById("no").innerText = `You are now 1 out of ${jsonResponse.no} people who have not gotten the Covid vaccine. :(`;
                document.getElementById("yes").innerText = `On the other hand, ${jsonResponse.yes} people have.`;
            }
        });
}