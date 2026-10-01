const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
  console.lo(xhr.response);
})
xhr.open('GET', 'https://supersimplebackend.dev');
xhr.send();
// xhr.response

//realms and runes