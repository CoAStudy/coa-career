// CoA Career LP — small interactions
document.addEventListener('DOMContentLoaded', function () {
  var track = document.getElementById('positionsTrack');
  var prevBtn = document.getElementById('scrollPrev');
  var nextBtn = document.getElementById('scrollNext');

  if (track && prevBtn && nextBtn) {
    var scrollByCard = function (direction) {
      var card = track.querySelector('.job-card');
      var gap = 24;
      var amount = card ? card.getBoundingClientRect().width + gap : 300;
      track.scrollBy({ left: direction * amount, behavior: 'smooth' });
    };
    prevBtn.addEventListener('click', function () { scrollByCard(-1); });
    nextBtn.addEventListener('click', function () { scrollByCard(1); });
  }
});
