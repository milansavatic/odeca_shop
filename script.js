const buttonMenu=()=>{
    let meni=document.querySelector('.header ul');
    let btn=document.querySelector('.header button');

    if(btn.innerText==='MENU'){
        meni.style.display='block';
        //kada kliknem meni posle ce pisati CLOSE
        btn.innerText='CLOSE';
    }
    else{
        meni.style.display='none';
        btn.innerText='MENU';
    }
}
    
    //davanje funkcionalnosti left i right button
    let leftBtn=document.querySelector('#left-btn');
    let rightBtn=document.querySelector('#right-btn');
    let picture=document.querySelectorAll('.slajder-slika img');

    let brojSlike=0;
    
    const slikaDesno=()=>{
        sakrivenaSlika();
        brojSlike++;
        if(brojSlike===picture.length){
            brojSlike=0;
        }
        picture[brojSlike].style.display='block';
    }
    
    const slikaLevo=()=>{
        sakrivenaSlika();
        brojSlike--;
        if(brojSlike===-1){
            brojSlike=picture.length-1;
        }
        picture[brojSlike].style.display='block';


    }
  
    //event lisener za levo i desno
    leftBtn.addEventListener('click',slikaLevo);
    rightBtn.addEventListener('click',slikaDesno);

    //funkcija koja sakriva slike
    const sakrivenaSlika=()=>{
        picture.forEach((img)=>{
        img.style.display='none';}
        )
    }
/**
 *PORTFOLIO 
  */   
 const portfolioKlik=(button)=>{
   let categorija=button.getAttribute('data-category');
   let portfolioBlok=document.querySelectorAll('.portfolio-prikaz-bloka');
   
   //skrivanje svih blokova
   portfolioBlok.forEach((item)=>{
       item.style.display='none';
   })
   //klik na sve prikaze sve
   if(categorija==='sve'){
       portfolioBlok.forEach((item)=>{
           item.style.display='block';
       })
   }
   //prikaz blokova iz njegovog naziva
   portfolioBlok.forEach((item)=>{
       if(item.getAttribute('data-category').includes(categorija)){
           item.style.display='block';
       }
   })
 }
const openModal=()=>{
    let popupBlok=document.querySelector('.popup-blok');
    let overlay=document.querySelector('.overlay');

    //prikaz popup prozora i close dugmeta
    popupBlok.style.display='block';
    overlay.style.display='block';
}

//zatvaranje popup
const closeModal=()=>{
    let popupBlok=document.querySelector('.popup-blok');
    let overlay=document.querySelector('.overlay');

    popupBlok.style.display='none';
    overlay.style.display='none';
}


//Podaci o korisnicima

let inputs=document.querySelectorAll('input');
//objekat za greska
let errors={
    "ime_prezime":[],
    "email":[],
    "lozinka":[],
    "ponovljena_lozinka":[],
};

//forEach petlja koja prolazi kroz svaki input i prikazuje njegov naziv
inputs.forEach(element=>{
    element.addEventListener('change', e=>{
        let currentInput=e.target;
        let inputValue=currentInput.value;
        let inputName=currentInput.getAttribute('name');

        if(inputValue.length>4){
            //praznim greske
            errors[inputName]=[];
            //switch za svako polje
            switch(inputName){
                case 'ime_prezime':
                    let validation=inputValue.trim();
                    validation=validation.split(" ");
                    if(validation.length<2){
                        errors[inputName].push("Izmedju imena i prezimena mora postojati razmak");
                    }
                    break;
                    case "email":
                        if(!validateEmail(inputValue)){
                            errors[inputName].push("Unesite pravilno mail adresu.");
                        }
                    break;
                    case "ponovljena_lozinka":{
                        let lozinka=document.querySelector('input[name="lozinka"]').value;
                        if(inputValue!==lozinka){
                            errors[inputName].push("Ponovljena lozinka nije dobra");
                        }
                    }
                        
            }

        }else{
            errors[inputName]=['Polje ne moze imati manje od 5 karaktera.']
        }
        keyErrors();
    })
})

//funkcija koja uzima key iz objekta
const keyErrors=()=>{
//brisanje nagomilanih gresaka
    for(let elem of document.querySelectorAll('ul')){
        elem.remove();
    }

    for(let key of Object.keys(errors)){
    let input=document.querySelector(`input[name="${key}"`);
    let parrentElement=input.parentElement;
    //lista sa greskama
    let errorsElement=document.createElement('ul');
    parrentElement.appendChild(errorsElement);
    console.log(parrentElement);
    //petlja za prolaz kroz greske
    errors[key].forEach(error=>{
        let li=document.createElement('li');
        li.innerText=error;

        errorsElement.appendChild(li);
    })
}
}
//funkcije za validaciju mejla
const validateEmail=email=>{
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        return true;
    }
    return false;
}