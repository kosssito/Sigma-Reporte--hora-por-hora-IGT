const hour = [7, 8, 9, 10, 11, 12, 1, 2, 3, 4];
const modeloRevArr = [
  {prefijo: "",modelo:"1600",rev:"A"},
  {prefijo: "",modelo:"7900",rev:"A"},
  {prefijo: "",modelo:"8500",rev:"A"},
  {prefijo: "",modelo:"8700",rev:"A"},
  {prefijo: "",modelo:"9000",rev:"A"},
  {prefijo: "",modelo:"9100",rev:"A"},
  {prefijo: "",modelo:"9300",rev:"A"},
  {prefijo: "",modelo:"9400",rev:"A"},
  {prefijo: "",modelo:"6400",rev:"A"},
]
let suma = {};

modeloRevArr.forEach((e,indexLine)=>{
  suma[`sumaL${indexLine+1}ok`] = (arrHour , modelo , rev)=>{
    
    // expresion regular que admite solo nuemeros en una string
    const regex = /^[0-9]*$/;
    let suma = 0;
    let arr = [];
    
  
    arrHour.forEach(h =>{
      let inputValue = document.getElementById(`l${indexLine+1}OkM${modelo}H${h}`).value;
      if (document.getElementById(`l${indexLine+1}OkM${modelo}H${h}`).value == "") {
        inputValue = 0;
      }
      if (regex.test(inputValue)) {
        arr.push(parseInt(inputValue));
      } else {
        arr.push(0);
        
      }
    })
  
    arr.forEach(e => {
      suma = e + suma;
    })
   
    document.getElementById(`TL${indexLine+1}-ok`).innerHTML = suma;
}


suma[`sumaL${indexLine+1}ng`] = (arrHour , modelo , rev)=>{

   // expresion regular que admite solo nuemeros en una string
   const regex = /^[0-9]*$/;
   let suma = 0;
   let arr = [];
 
   arrHour.forEach(h =>{
     let inputValue = document.getElementById(`l${indexLine+1}NgM${modelo}H${h}`).value;
     if (document.getElementById(`l${indexLine+1}NgM${modelo}H${h}`).value == "") {
       inputValue = 0;
     }
     if (regex.test(inputValue)) {
       arr.push(parseInt(inputValue));
     } else {
       arr.push(0);
       
     }
   })
 
   arr.forEach(e => {
     suma = e + suma;
   })
  
   document.getElementById(`TL${indexLine+1}-ng`).innerHTML = suma;
}

})

const minimizar = (tr,b)=>{
  tr.className = "D-none"
  b.className = "btn-models"

  
}
const maximizar = (tr,b)=>{
  tr.className = ""
  b.className = "D-none"
  
}


const accion = () => {
  let tablas="";
  let buttons ="";
  let tableHour="";

  hour.forEach( h =>{tableHour = tableHour + `<th>${h}-${h+1}</th>`});


  const harderTables = (prefijo, modelo, rev, indexLine)=>{
   return ` 
    <tr class="D-none" id="tr${indexLine+1}">
      <td>${prefijo}${modelo} REV-${rev}</td>
      <td><input type="text" class="input-so"></td>
      <td>
      <label class="ok-ng" >OK</label>
      <label class="ok-ng">NG</label>
      </td>`;
  }
  
  const createInputs = (hourArr, modelo, rev, indexLine)=>{
    let inputs= "";

    hourArr.map((hour) =>{
      let ok = `suma.sumaL${indexLine}ok([${hourArr}],${modelo}, '${rev}') `
      let ng = `suma.sumaL${indexLine}ng([${hourArr}],${modelo}, '${rev}') `
     inputs = inputs + `
      <td>
      <input onchange="${ok}" onkeyup="${ok}" id="l${indexLine}OkM${modelo}H${hour}" type="number" class="input-n">
      <input onchange="${ng}" onkeyup="${ng}" id="l${indexLine}NgM${modelo}H${hour}" type="number" class="input-n">
      </td>
     `
    })
    return inputs;

  }
  
modeloRevArr.forEach((e, indexLine) =>{
  
   tablas = tablas + `
      ${harderTables(e.prefijo ,e.modelo, e.rev, indexLine)} 
      ${createInputs(hour,e.modelo,e.rev, indexLine+1)}
      <td>
        <label id="TL${indexLine+1}-ok" class="ok-ng total-ok">0</label>
        <label id="TL${indexLine+1}-ng" class="ok-ng total-ng">0</label>
        </td> 
        <td>
        <button onclick="minimizar(tr${indexLine+1},b${indexLine+1})">-</button>
        </td> 
    </tr>

    `
    buttons = buttons + `<button id="b${indexLine+1}" class="btn-models" onclick="maximizar(tr${indexLine+1}, b${indexLine+1})" >${e.prefijo}${e.modelo} Rev ${e.rev}</button>` ;
  })

  let baseHtml = `
    <table>
      <tr>
        <th>MODELO</th>
        <th>S.O.</th>
        <th>    </th>
        ${tableHour}
        <th>Total</th>
        <th></th>
       </tr>
    ` ;
  let end = `<table>`;
 
  document.getElementById("table").innerHTML = baseHtml + tablas + end;
  document.getElementById("comentarios").innerHTML = `<textarea placeholder="Deja aqui tus comentarios del dia"></textarea>`;
  document.getElementById("buttons").innerHTML =  buttons;
  document.getElementById("header-table").innerHTML = `
  <table class="table-header">
  <tr>
      <th>Fecha</th>
      <td><input class="input-header"  type="date"></td>
  </tr>
  <tr>
      <th>Nombre</th>
      <td><input class="input-header" type="text"></td>
  </tr>
  <tr>
      <th>No. Emepleado</th>
      <td><input class="input-header" type="text"></td>
  </tr>
</table>
  `

}

const consulta = async()=>{
  // let response = await fetch("https://myfakeapi.com/api/users/")
  // let data = await response.json()
  // console.log(data.Users.slice(0,5))
  // fetch('https://myfakeapi.com/api/users/')
  // .then(response => response.json())
  // .then(data => console.log(data));
  
}

window.onload = ()=>{
  accion();
  tr1.className = "";
  b1.className = "D-none"
  
 consulta()
//  console.log(response);
}

// advertencia para confirmar antes de salir de la pagnia
// window.onbeforeunload = confirmExit;
// function confirmExit()
// {
//   return "";
// }

