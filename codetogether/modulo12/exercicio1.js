
//objetos: 

const alfalfa =       "alfalfa"
const carneiro =      "carneiro"
const lobo =          "lobo"
const ladoDireito =   "ladoDireito"
const ladoEsquerdo =  "ladoEsquerdo"


function outroLado(lado){
  if (lado ===  ladoDireito)  {
    return ladoEsquerdo;
    }
  else {
    return ladoDireito;
    }
  } 

function Barco(carga, ladoDoRio) {
  this.carga =        carga;
  this.ladoDoRio =    ladoDoRio;
  }

incompativeis = [
    new Set(  [alfalfa,   carneiro  ] )
  , new Set(  [carneiro,  lobo      ] )
  ]

function atravessar(barco, lados) {
  barco.ladoDoRio = outroLado(barco.ladoDoRio)
  if (!(checarIncomp(lados, outroLado(barco.ladoDoRio)))){ 
    
    lados.set(outroLado(barco.ladoDoRio), undefined)
    }
  return ([barco, lados])
  }
function checarIncomp(lados, lado) {
  bixos = lados.get(lado);
  canDo = true;
  for (let i of bixos){for (let j of bixos){
    if(i === j) continue;
    for (let parIncomp of incompativeis){
      let isProblema = parIncomp.has(i) && parIncomp.has(j);
      canDo = canDo && ( !isProblema);
    } 
  }}
  return canDo;
  }

function descarregar(barco, lados){
  if (barco.carga != null) {
    let lado = lados.get(barco.ladoDoRio);
    lado = lado.concat( [barco.carga]);
    lados.set(barco.ladoDoRio, lado)
    barco.carga = null;
    }
  return ([barco, lados])
  }

function carregar(barco, lados, bixo) {
  if (barco.carga === null) {
    let lado = lados.get(barco.ladoDoRio);
    if (lado.indexOf(bixo) + 1 ){
      lado = lado.filter((x) => x != bixo);
      carga = bixo
      } 
    else{
      carga = null
      }
    barco.carga = carga;
    lados.set(barco.ladoDoRio, lado);
    }
    return ([barco, lados]);
  }
function isVitoria(lados, barco){
  lados.get(ladoEsquerdo).has()  
  }

let lados = new Map(
  [ [ ladoDireito   , [ carneiro, alfalfa, lobo]] 
  , [ ladoEsquerdo  , [ ] ] ]
  );

/* Idealmente, esse codigo seria refatorado em alguma forma de manter o estado, como algum tipo de classe State ou algo assim que cuida de executar esses codigos e se modificar, alem de manter um historico do que aconteceu, mas eu nao entendo javascript mto bem. */
// TODO: some heavy ass refactoring
function testeResolucao() {
  console.log(barco = new Barco(null, ladoDireito));
  console.log([barco, lados] = carregar(barco,lados, carneiro));
  console.log([barco, lados] = atravessar(barco, lados));
  console.log([barco, lados] = descarregar(barco, lados));
  console.log([barco, lados] = atravessar(barco, lados));
  console.log([barco, lados] = carregar(barco, lados, alfalfa));
  console.log([barco, lados] = atravessar(barco, lados));
  console.log([barco, lados] = descarregar(barco, lados));
  console.log([barco, lados] = carregar(barco, lados, carneiro));
  console.log([barco, lados] = atravessar(barco, lados));
  console.log([barco, lados] = descarregar(barco, lados));
  console.log([barco, lados] = carregar(barco, lados, lobo))
  console.log([barco, lados] = atravessar(barco, lados))
  console.log([barco, lados] = descarregar(barco, lados))
  console.log([barco, lados] = atravessar(barco, lados))
  console.log([barco, lados] = carregar(barco, lados, alfalfa))
  console.log([barco, lados] = atravessar(barco, lados))
  console.log([barco, lados] = descarregar(barco, lados))
  console.log([barco, lados] = atravessar(barco, lados))
  console.log([barco, lados] = carregar(barco, lados, carneiro))
  console.log([barco, lados] = atravessar(barco, lados))
  console.log([barco, lados] = descarregar(barco, lados));
}  
testeResolucao();