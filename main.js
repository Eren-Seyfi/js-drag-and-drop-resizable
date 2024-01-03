// https://interactjs.io/

import interact from "interactjs"; // interact.js kütüphanesi import edildi

let genislik, yukseklik; // Genişlik ve yükseklik değerlerini saklamak için değişkenler tanımlandı

// .resizable sınıfına sahip öğelerin yeniden boyutlandırılabilir hale getirilmesi
interact(".resizable").resizable({
  edges: { top: true, left: true, bottom: true, right: true }, // Tüm kenarların yeniden boyutlandırılabilir olması sağlandı
  listeners: {
    move: function (event) {
      let { x, y } = event.target.dataset;

      // Öğenin yeni X ve Y konumları hesaplandı
      x = (parseFloat(x) || 0) + event.deltaRect.left;
      y = (parseFloat(y) || 0) + event.deltaRect.top;

      // Öğenin boyutu ve konumu güncellendi
      Object.assign(event.target.style, {
        width: `${event.rect.width}px`,
        height: `${event.rect.height}px`,
        transform: `translate(${x}px, ${y}px)`,
      });

      // Yeni X ve Y konumları kaydedildi
      Object.assign(event.target.dataset, { x, y });

      // Güncellenmiş genişlik ve yükseklik değerleri alındı
      genislik = event.target.style.width;
      yukseklik = event.target.style.height;

      // Konsola güncellenmiş boyutlar yazdırıldı
      console.log("Genişlik = " + genislik, "Yükseklik = " + yukseklik);
    },
  },
});

// .draggable sınıfına sahip öğelerin sürüklenebilir hale getirilmesi
interact(".draggable").draggable({
  inertia: true, // Hareketin sürtünmesini simüle eden 'inertia' özelliği etkinleştirildi
  modifiers: [
    interact.modifiers.restrictRect({
      restriction: "parent", // Öğelerin sürüklendiği alan belirtildi (parent içinde)
      endOnly: true,
    }),
  ],
  autoScroll: true, // Otomatik kaydırma etkinleştirildi

  listeners: {
    move: dragMoveListener, // Her sürükleme hareketi için dragMoveListener işlevi çağrılacak
    end(event) {
      var textEl = event.target.querySelector("p");

      // Sürükleme işlemi bittiğinde mesafe hesaplandı ve p etiketi içine yazıldı
      textEl &&
        (textEl.textContent =
          "moved a distance of " +
          Math.sqrt(
            (Math.pow(event.pageX - event.x0, 2) +
              Math.pow(event.pageY - event.y0, 2)) |
              0
          ).toFixed(2) +
          "px");
    },
  },
});

// Sürükleme işlevi
function dragMoveListener(event) {
  var target = event.target;
  // Sürüklendiği konum güncellendi ve konsola yazdırıldı
  var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;
  console.log("x ekseni = " + x, "y ekseni = " + y);

  // Öğenin konumu güncellendi
  target.style.transform = "translate(" + x + "px, " + y + "px)";

  // Öğenin konum bilgileri güncellendi
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}

// Bu işlev daha sonra yeniden boyutlandırma ve jest demo'larında kullanılacak
window.dragMoveListener = dragMoveListener;
