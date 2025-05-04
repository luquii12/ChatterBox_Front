// src/pages/chat.mdx
import ChatApp from '@site/src/components/App';

# 💬 Chat en Tiempo Real con Supabase

Este es un ejemplo de chat en tiempo real usando **Supabase** + **React**. Puedes probarlo aquí mismo:

<ChatApp />

---

## 🧠 ¿Cómo funciona?

- Usa `Supabase` para leer e insertar mensajes.
- Se suscribe en tiempo real a nuevos mensajes usando `supabase.channel()`.
- Cambia el usuario en caliente y prueba desde varias pestañas.
