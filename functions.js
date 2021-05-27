var db = firebase.firestore();



document.onclick = function(event) {
    if (event === undefined) event = window.event;
    const target = 'target' in event ? event.target : event.srcElement;

    if (target.classList.contains("yes")) {
        window.location.href = "yes.html";
    } else if (target.classList.contains("no")) {
        window.location.href = "no.html";
    }
}

function updateCount(answer) {
    let docRef = db.collection("answers").doc(answer);
    docRef.get().then((doc) => {
        let num = doc.data().count + 1;
        db.collection("answers").doc(answer).set({
            count: num
        });
    });
}

function getData(fromYes) {
    if (fromYes) {
        let docRef = db.collection("answers").doc("yes");
        docRef.get().then((doc) => {
            // + 1 because we haven't added this user to the count yet
            document.getElementById("yes").innerText = "You are now 1 out of " + (doc.data().count+1) + " people who have gotten the Covid vaccine. :)";
        })
        docRef = db.collection("answers").doc("no");
        docRef.get().then((doc) => {
            document.getElementById("no").innerText = "On the other hand, " + doc.data().count + " people have not.";
        })
    } else {
        let docRef = db.collection("answers").doc("no");
        docRef.get().then((doc) => {
            // + 1 because we haven't added this user to the count yet
            document.getElementById("no").innerText = "You are now 1 out of " + (doc.data().count+1) + " people who have not gotten the Covid vaccine. :(";
        })
        docRef = db.collection("answers").doc("yes");
        docRef.get().then((doc) => {
            document.getElementById("yes").innerText = "On the other hand, " + doc.data().count + " people have.";
        })
    }
}