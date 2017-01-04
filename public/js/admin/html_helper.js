const HTMLHelper = {
  init: function() {
    this._initDeleteAlertEvents();
  },

  _initDeleteAlertEvents: function() {
    const cancelBtn = document.querySelector('#dia-cancel');
    const deleteBtn = document.querySelector('#dia-delete');

    cancelBtn.addEventListener('click', function(evt) {
      evt.preventDefault();
      AlertHelper.close('#delete-item-alert');
    });

    const deleteBtns = document.querySelectorAll('.delete');
    Array.prototype.forEach.call(deleteBtns, function(btn) {
      btn.addEventListener('click', function(evt) {
        evt.preventDefault();
        deleteBtn.addEventListener('click', function callback(evt) {
          evt.preventDefault();
          deleteBtn.removeEventListener('click', callback);
          window.location.href = btn.getAttribute('href');
        });

        AlertHelper.alert('#delete-item-alert');
      })
    });
  }
};

window.addEventListener('load', function() {
  HTMLHelper.init();
});
