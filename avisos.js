import {db,hoje,diasAte,esc,doc,getDoc,setDoc} from "./comum.js";
export const DIAS_NOMES=['domingo','segunda-feira','terça-feira','quarta-feira','quinta-feira','sexta-feira','sábado'];
export const CFG0={diaCompra:3,horaFechamento:21}; // padrão: quarta-feira e 21h
export async function cfg(){try{const s=await getDoc(doc(db,'config','avisos'));return {...CFG0,...(s.exists()?s.data():{})}}catch(e){return CFG0}}
export const salvaCfg=c=>setDoc(doc(db,'config','avisos'),c);
const nomes=a=>a.slice(0,8).map(i=>esc(i.nome)).join(', ')+(a.length>8?' e mais '+(a.length-8):'');
function abre(A){const m=document.createElement('div');m.className='modal';
 m.innerHTML='<div style="border-top-color:var(--p)"><h2 style="margin-top:0">🔔 Avisos de hoje</h2>'+(A.length?A.map(a=>`<div class="card"><span class="tag ${a[0]}">${a[1].split(' ')[0]}</span><b>${a[1].slice(a[1].indexOf(' ')+1)}</b><br><small>${a[2]}</small></div>`).join(''):'<div class="card">Tudo certo por aqui. Nenhum aviso agora ✅</div>')+'<button class="b">Entendi</button></div>';
 m.querySelector('button').onclick=()=>m.remove();document.body.append(m)}
export async function avisos(painel,L){try{
 const c=await cfg(),d=new Date(),A=[];
 const cr=L.filter(i=>i.estoque<=i.minimo),ba=L.filter(i=>i.estoque>i.minimo&&i.estoque<=i.minimo*1.5);
 const vc=L.filter(i=>i.validade&&i.estoque>0&&diasAte(i.validade)<=3);
 if(cr.length)A.push(['bad','🚨 Estoque crítico',nomes(cr)]);
 if(ba.length)A.push(['warn','📉 Estoque baixando',nomes(ba)]);
 if(vc.length&&painel!='loja')A.push(['bad','⏳ Validade próxima',nomes(vc)+'. É recomendável criar uma promoção com esse item.']);
 if(d.getDay()==c.diaCompra)A.push(['ok','🛒 Hoje é dia de compra ('+DIAS_NOMES[c.diaCompra]+')','Abra o painel do comprador, veja as sugestões de compra e confira a quantidade e a validade dos itens.']);
 if(d.getDay()==1)A.push(['ok','📊 Segunda-feira','O fechamento de hoje também registra o total da semana para o giro.']);
 if(d.getHours()>=c.horaFechamento&&!(await getDoc(doc(db,'fechamentos',hoje()))).exists())A.push(['warn','📝 Fechamento do dia pendente','A loja ainda não registrou a pesagem de hoje.']);
 const hd=document.querySelector('header'),b=document.createElement('button');
 b.textContent='🔔'+(A.length?' '+A.length:'');b.onclick=()=>abre(A);hd.insertBefore(b,hd.lastElementChild);
 const k='av_'+painel+'_'+hoje();let v=null;try{v=localStorage.getItem(k)}catch(e){}
 if(A.length&&!v){try{localStorage.setItem(k,'1')}catch(e){}abre(A)}
}catch(e){console.warn('avisos:',e)}}
