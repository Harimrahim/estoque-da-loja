import {initializeApp} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {getFirestore,collection,doc,getDoc,getDocs,setDoc,addDoc,updateDoc,deleteDoc,writeBatch,query,orderBy,limit,serverTimestamp} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import * as C from "./firebase-config.js";
const firebaseConfig=C.firebaseConfig||C.default;
if(!firebaseConfig||!firebaseConfig.apiKey||/COLE_AQUI/.test(firebaseConfig.apiKey))throw new Error("O arquivo firebase-config.js está sem as chaves do Firebase (passo 2 das instruções).");
const app=initializeApp(firebaseConfig),db=getFirestore(app);
export const auth=null;
export {db,collection,doc,getDoc,getDocs,setDoc,addDoc,updateDoc,deleteDoc,writeBatch,query,orderBy,limit,serverTimestamp};
export const $=id=>document.getElementById(id);
export const hoje=()=>new Date().toLocaleDateString('sv-SE'); // AAAA-MM-DD no fuso do aparelho
export const diasAte=d=>Math.round((new Date(d+'T00:00')-new Date(hoje()+'T00:00'))/864e5);
export const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
export const dBR=d=>d?d.split('-').reverse().join('/'):'';
export const sair=()=>{location="index.html"};
export const guard=(ok,cb)=>cb({email:ok[0]},ok[0]); // sem login: abre direto
export const itens=async()=>(await getDocs(collection(db,'itens'))).docs.map(d=>({id:d.id,...d.data()})).sort((a,b)=>a.nome.localeCompare(b.nome));
