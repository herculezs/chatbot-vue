import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const pdf = {
  async saveCSVFile(chartComparePath, barChartPath, textCharacter,
    titleCharacter, reportPage = false, x1 = 15, x2 = 110) {
    // eslint-disable-next-line new-cap
    const doc = new jsPDF({ orientation: 'p', unit: 'mm' });
    // eslint-disable-next-line no-undef
    if (reportPage) {
      // eslint-disable-next-line no-param-reassign
      chartComparePath.style.width = '445px';
      // eslint-disable-next-line no-param-reassign
      barChartPath.style.width = '445px';
    }
    window.scrollTo(0, 0);
    return Promise.resolve(this.delay(1000).then(() => html2canvas(chartComparePath, {
      width: 600,
      height: 600,
      scrollX: -window.scrollX,
      scrollY: -window.scrollY,
      windowWidth: document.documentElement.offsetWidth,
      windowHeight: document.documentElement.offsetHeight,
    }).then((canvas) => {
      doc.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', x1, 10, 110, 110);
      return html2canvas(barChartPath, {
        width: 600,
        height: 600,
        scrollX: -window.scrollX,
        scrollY: -window.scrollY,
        windowWidth: document.documentElement.offsetWidth,
        windowHeight: document.documentElement.offsetHeight,
        // eslint-disable-next-line no-unused-vars
      }).then((img2) => {
        doc.addImage(img2.toDataURL('image/jpeg'), 'JPEG', x2, 10, 110, 110);
        // eslint-disable-next-line no-param-reassign
        chartComparePath.style.width = '';
        // eslint-disable-next-line no-param-reassign
        barChartPath.style.width = '';
        const cardHTML = `<div style="padding: 0 2px 0 2px; width: 190px; height: 80%">
                            <div style="text-align: center; font-size: 8px;margin-bottom: 5px">
                                  <b>Based on your answers, your type is ...</b>
                            </div>
                            <div style="border-radius: 5px; background-color: #7811C9; color: white; font-size: 4px; width: 185px">
                            <div style="text-align: center; font-size: 6px; ">
                                  <b>${titleCharacter}</b>
                            </div>
                            <p style="padding: 4px; margin-bottom: 2px;">${textCharacter}</p>
                            </div>
                            </div>`;

        return doc.html(cardHTML, {
          // eslint-disable-next-line no-shadow
          callback(doc) {
            doc.save('report');
          },
          x: 10,
          y: 120,
          html2canvas: {
            scale: 1,
          },
        });
      });
    })));
  },
  delay(ms) {
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
      setTimeout(resolve, ms);
    });
  },
};

export default pdf;
