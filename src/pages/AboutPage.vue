// About page for example, should design at the end
<template>
<div>
<div class="about-section">
  <h1 class="title">About Us</h1>
  <h4>Ben Margalit & Mor Saranga</h4>
  <p>Third year Software and Information Systems Engineering students in Ben Gurion University.
  <br>
  This is a League Management Website we've built for our web course we took during our academic studies.</p>
  <p>This League Management Website had 3 parts:
    <br>
    API: written using Swagger API in YAML
    <br>
    Backend: Node.js
    <br>
    Frontend: Vue.js
    <br>
  </p>
  <h4>Prior Projects</h4>
  <p> Pacman: Javascript, Jquery, HTML and CSS
    <br>
    <a href="https://github.com/Web-Development-Environments-2021/Assignment2_211896535_205543606">Pacman GitHub</a>
    <br>
    <a href="https://web-development-environments-2021.github.io/Assignment2_211896535_205543606/">Pacman Website</a>
  </p>
  <p> 3rd Genretion Website: Jquery, HTML and CSS
    <br>
    <a href="https://github.com/Web-Development-Environments-2021/205543606">Mor's 3rd Gen GitHub</a>
    <br>
    <a href="https://web-development-environments-2021.github.io/205543606/">Mor's 3rd Gen Website: Ruby Rivlin</a>
    <br>
    <a href="https://github.com/Web-Development-Environments-2021/211896535">Ben's 3rd Gen GitHub</a>
    <br>
    <a href="https://web-development-environments-2021.github.io/211896535/">Ben's 3rd Gen Website: Meme</a>
  </p>
</div>

<h2 style="text-align:center">Our Team</h2>
<div id="info-us" class="row">
  <div class="column">
    <div class="card">
      <img class="img-us" :src=benImg alt="Ben">
      <div class="container">
        <h2>Ben Margalit</h2>
        <p class="title">Partner</p>
        <p>{{benMail}}</p>
        <p><a :href="`mailto:${benMail}`" class="button-contact">Contact</a></p>
      </div>
    </div>
  </div>

  <div class="column">
    <div class="card">
      <img class="img-us" :src=morImg alt="Mor">
      <div class="container">
        <h2>Mor Saranga</h2>
        <p class="title">Partner</p>
        <p>{{morMail}}</p>
        <p><a :href="`mailto:${morMail}`" class="button-contact">Contact</a></p>
      </div>
    </div>
  </div>
</div>
</div>
</template>
<script>
export default {
    data(){
      return{
        benImg:"https://i.imgur.com/eI7yOiN.jpeg",
        morImg:"https://i.imgur.com/5Uzdegu.jpeg",
        benMail:"benmarga@post.bgu.ac.il",
        morMail:"morlisa@post.bgu.ac.il"
      }
    },
}
</script>
<style>
body {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
}

html {
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: inherit;
}

.img-us{
  width: 250px;
  height: 250px;
}
/* #info-us{
  justify-content: center;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
} */
.column {
  width: 50%;
  margin-bottom: 16px;
  padding: 0 8px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 8px;
  width: 95%;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.about-section {
  padding: 50px;
  text-align: center;
  background-color: #474e5d;
  color: white;
}

.container {
  padding: 0 16px;
}

.container::after, .row::after {
  content: "";
  clear: both;
  display: table;
}

.title {
  color: grey;
}

.button-contact {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 60%;
}

.button-contact:hover {
  background-color: #555;
}

#prior-projects-list{
  list-style: none;
  justify-content: center;
  align-items: center;
  text-align: center;
}

@media screen and (max-width: 650px) {
  .column {
    width: 100%;
    display: block;
  }
}
</style>