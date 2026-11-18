document.getElementById('year').textContent=new Date().getFullYear();const menu=document.querySelector('.mobile'),nav=document.querySelector('#nav');menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú')});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));document.querySelectorAll('.tab').forEach(tab=>tab.addEventListener('click',()=>{document.querySelectorAll('.tab').forEach(t=>{t.classList.remove('active');t.setAttribute('aria-selected','false')});document.querySelectorAll('.tab-panel').forEach(p=>p.classList.add('hidden'));tab.classList.add('active');tab.setAttribute('aria-selected','true');document.getElementById(tab.dataset.tab).classList.remove('hidden')}));document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));button.classList.add('active');document.querySelectorAll('.project-card').forEach(card=>card.classList.toggle('hide',button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter))}));
// Envío de formulario con EmailJS (sin backend).
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
contactForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;
  const config = window.EMAILJS_CONFIG || {};
  const button = contactForm.querySelector('button[type="submit"]');
  const setStatus = (message, isError = false) => {
    formStatus.textContent = message;
    formStatus.style.color = isError ? '#ff8ba7' : '#5fe0c5';
  };
  if (!config.publicKey || !config.serviceId || !config.templateId ||
      Object.values(config).some(value => String(value).startsWith('TU_'))) {
    setStatus('Configurá primero los tres identificadores en emailjs-config.js.', true);
    return;
  }
  if (!window.emailjs) {
    setStatus('No se pudo cargar EmailJS. Comprobá tu conexión a Internet.', true);
    return;
  }
  const fields = contactForm.elements;
  const params = {
    from_name: fields.name.value.trim(),
    from_email: fields.email.value.trim(),
    reply_to: fields.email.value.trim(),
    subject: fields.subject.value.trim(),
    message: fields.message.value.trim()
  };
  button.disabled = true;
  button.textContent = 'Enviando…';
  setStatus('Enviando mensaje…');
  try {
    await window.emailjs.send(config.serviceId, config.templateId, params, { publicKey: config.publicKey });
    setStatus('¡Mensaje enviado correctamente! Gracias por contactarme.');
    contactForm.reset();
  } catch (error) {
    console.error('Error al enviar el mensaje:', error);
    setStatus('No se pudo enviar el mensaje. Intentá nuevamente o escribime directamente por correo.', true);
  } finally {
    button.disabled = false;
    button.textContent = 'Enviar mensaje ↗';
  }
});
