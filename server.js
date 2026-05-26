const form = document.getElementById("signupForm");

const message = document.getElementById("message");

const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const name = document.getElementById("name").value.trim();

  const mobile = document.getElementById("mobile").value.trim();

  if(mobile.length !== 10){

    message.innerText = "Please enter valid mobile number";

    message.className = "error";

    return;
  }

  submitBtn.disabled = true;

  submitBtn.innerText = "Submitting...";

  try{

    const response = await fetch("/api/signup", {

      method:"POST",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify({
        name,
        mobile
      })

    });

    const data = await response.json();

    if(response.ok){

      localStorage.setItem("studentName", name);

      window.location.href = "/welcome.html";

    }else{

      message.innerText = data.error;

      message.className = "error";
    }

  }catch(error){

    message.innerText = "Server error";

    message.className = "error";
  }

  submitBtn.disabled = false;

  submitBtn.innerText = "Submit";

});
