/* Colocá musica.mp3 en la misma carpeta que index.html. */
(()=>{
  if(document.querySelector('#portfolio-music')) return;
  const audio=document.createElement('audio');
  audio.id='portfolio-music'; audio.src='musica.mp3'; audio.loop=true; audio.preload='none'; audio.volume=.2;
  const player=document.createElement('div'); player.className='music-player';player.setAttribute('role','group');player.setAttribute('aria-label','Música ambiental del portfolio');
  const button=document.createElement('button');button.type='button';button.textContent='▶';button.setAttribute('aria-label','Reproducir música');button.setAttribute('aria-pressed','false');
  const info=document.createElement('div');const title=document.createElement('span');title.className='music-title';title.textContent='Música ambiental';const state=document.createElement('span');state.className='music-state';state.textContent='Activar música';info.append(title,state);
  const volume=document.createElement('input');volume.type='range';volume.min='0';volume.max='100';volume.value='20';volume.setAttribute('aria-label','Volumen de la música');
  player.append(button,info,volume);document.body.append(audio,player);
  const update=()=>{const playing=!audio.paused;button.textContent=playing?'❚❚':'▶';button.setAttribute('aria-label',playing?'Pausar música':'Reproducir música');button.setAttribute('aria-pressed',String(playing));state.textContent=playing?'Reproduciendo':'Activar música'};
  button.addEventListener('click',async()=>{if(audio.paused){try{await audio.play()}catch(e){state.textContent='Agregá musica.mp3 a la carpeta';console.warn('No se pudo reproducir musica.mp3',e)}}else{audio.pause()}update();if(audio.error)state.textContent='No se encontró musica.mp3'});
  volume.addEventListener('input',()=>{audio.volume=Number(volume.value)/100});audio.addEventListener('play',update);audio.addEventListener('pause',update);audio.addEventListener('error',()=>{state.textContent='No se encontró musica.mp3'});
  // No se reproduce automáticamente: requiere interacción del visitante.
})();
