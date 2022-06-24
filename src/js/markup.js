function markup(arr, userId) {
  return arr
    .map(item => {
      if (item.type === 'message') {
        return markupMessage(item, userId);
      }
      if (item.type === 'picture') {
        return markupImageBox(item, userId);
      }
    })
    .join('');
}

function markupMessage(obj, userId) {
  const { message, avatar, date, uid } = obj;
  return `<div class="message ${userId === uid ? 'contact' : ''}">
          <img
          class="avatar"
            src="${avatar}"
            alt=""
            width="30"
            height="30"
          />
          <p class="message__content">
            ${message}
          </p>
          <div class="timestamp">${date}</div>
        </div>`;
}

function markupImageBox(obj, uid) {
  return `<div class="media-box ${obj.uid === uid ? 'position-right' : ''}">
          <img
            src="${obj.picture}"
            alt="${obj.message}"
            class="image-message"
          />
          <p class="img-meta">${obj.date}</p>
        </div>`;
}

export { markup };
