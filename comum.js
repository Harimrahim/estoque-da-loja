import {initializeApp} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {getAuth,onAuthStateChanged,signInWithEmailAndPassword,signOut} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {getFirestore,collection,doc,getDoc,getDocs,setDoc,addDoc,updateDoc,deleteDoc,writeBatch,query,orderBy,limit,serverTimestamp} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {firebaseConfig} from "./firebase-config.js";
const app=initializeApp(firebaseConfig),auth=getAuth(app),db=getFirestore(app);
export {auth,db,onAuthStateChanged,signInWithEmailAndPassword,collection,doc,getDoc,getDocs,setDoc,addDoc,updateDoc,deleteDoc,writeBatch,query,orderBy,limit,serverTimestamp};
export const $=id=>document.getElementById(id);
export const hoje=()=>new Date().toLocaleDateString('sv-SE'); // AAAA-MM-DD no fuso do aparelho
export const diasAte=d=>Math.round((new Date(d+'T00:00')-new Date(hoje()+'T00:00'))/864e5);
export const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
export const dBR=d=>d?d.split('-').reverse().join('/'):'';
export const sair=()=>signOut(auth).then(()=>location='index.html');
export const papelDe=async u=>{const s=await getDoc(doc(db,'usuarios',u.uid));return s.exists()?s.data().papel:null};
export function guard(ok,cb){onAuthStateChanged(auth,async u=>{if(!u)return location='index.html';const p=await papelDe(u);if(!ok.includes(p)){alert('Seu usuário ainda não tem permissão para esta tela.');return sair()}cb(u,p)})}
export const itens=async()=>(await getDocs(collection(db,'itens'))).docs.map(d=>({id:d.id,...d.data()})).sort((a,b)=>a.nome.localeCompare(b.nome));
