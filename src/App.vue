<template>
  <div id="app">
    <vue-html2pdf
      :show-layout="controlValue.showLayout"
      :float-layout="controlValue.floatLayout"
      :enable-download="controlValue.enableDownload"
      :preview-modal="controlValue.previewModal"
      :filename="controlValue.filename"
      :paginate-elements-by-height="controlValue.paginateElementsByHeight"
      :pdf-quality="controlValue.pdfQuality"
      :pdf-format="controlValue.pdfFormat"
      :pdf-orientation="controlValue.pdfOrientation"
      :pdf-content-width="controlValue.pdfContentWidth"
      :manual-pagination="controlValue.manualPagination"
      :html-to-pdf-options="htmlToPdfOptions"
      @progress="onProgress($event)"
      @startPagination="startPagination()"
      @hasPaginated="hasPaginated()"
      @beforeDownload="beforeDownload($event)"
      @hasDownloaded="hasDownloaded($event)"
      ref="html2Pdf"
    >
      <pdf-content @domRendered="domRendered()" slot="pdf-content" />
    </vue-html2pdf>

    <section class="title-container">
      <h1 class="title-header">Vue HTML2PDF</h1>
    </section>

    <controls-container :progress="progress" @generateReport="downloadPdf()" />
  </div>
</template>

<script>
import PdfContent from "@/components/PdfContent";
// import VueHtml2pdf from "@/components/VueHtml2pdf";
import ControlsContainer from "@/components/ControlsContainer";
import VueHtml2pdf from 'vue-html2pdf'
// import VueHtml2pdf from "vue-html2pdf-test";
import { mapFields } from "vuex-map-fields";

export default {
  name: "app",

  data() {
    return {
      contentRendered: false,
      progress: 0,
      generatingPdf: false,
      pdfDownloaded: false,
    };
  },

  computed: {
    ...mapFields(["controlValue"]),

    htmlToPdfOptions() {
      return {
        margin: 0,

        filename: "hee hee.pdf",

        image: {
          type: "jpeg",
          quality: 0.98,
        },

        enableLinks: true,

        html2canvas: {
          scale: this.controlValue.pdfQuality,
          useCORS: true,
        },

        jsPDF: {
          unit: "in",
          format: this.controlValue.pdfFormat,
          orientation: this.controlValue.pdfOrientation,
        },
      };
    },
  },

  methods: {
    async downloadPdf() {
      if (!(await this.validateControlValue())) return;

      this.$refs.html2Pdf.generatePdf();
    },

    validateControlValue() {
      if (this.controlValue.pdfQuality > 2) {
        alert("pdf-quality value should only be 0 - 2");
        this.controlValue.pdfQuality = 2;

        return false;
      }

      if (!this.controlValue.paginateElementsByHeight) {
        alert("paginate-elements-by-height value cannot be empty");
        this.controlValue.paginateElementsByHeight = 1400;

        return false;
      }

      const paperSizes = [
        "a0",
        "a1",
        "a2",
        "a3",
        "a4",
        "letter",
        "legal",
        "a5",
        "a6",
        "a7",
        "a8",
        "a9",
        "a10",
      ];

      if (!paperSizes.includes(this.controlValue.pdfFormat)) {
        alert(`pdf-format value should only be ${paperSizes}`);
        this.controlValue.pdfFormat = "a4";

        return false;
      }

      if (!this.controlValue.pdfOrientation) {
        alert("pdf-orientation value cannot be empty");
        this.controlValue.pdfOrientation = "portrait";

        return false;
      }

      if (!this.controlValue.pdfContentWidth) {
        alert("pdf-content-width value cannot be empty");
        this.controlValue.pdfContentWidth = "800px";

        return false;
      }

      return true;
    },

    onProgress(progress) {
      this.progress = progress;
      console.log(`PDF generation progress: ${progress}%`)
    },

    startPagination() {
      console.log(`PDF has started pagination`)
    },

    hasPaginated () {
      console.log(`PDF has been paginated`)
    },

    async beforeDownload ({ html2pdf, options, pdfContent }) {
      console.log(`On Before PDF Generation`)
      // await html2pdf().set(options).from(pdfContent).toPdf().get('pdf').then((pdf) => {
			// 	const totalPages = pdf.internal.getNumberOfPages()
			// 	for (let i = 1; i <= totalPages; i++) {
			// 		pdf.setPage(i)
			// 		pdf.setFontSize(10)
			// 		pdf.setTextColor(150)
			// 		pdf.text('Page ' + i + ' of ' + totalPages, (pdf.internal.pageSize.getWidth() * 0.88), (pdf.internal.pageSize.getHeight() - 0.3))
			// 	} 
			// }).save()
    },

    hasDownloaded (blobPdf) {
      console.log(`PDF has downloaded yehey`)
      this.pdfDownloaded = true
      console.log(blobPdf)
    },

    domRendered() {
      console.log("Dom Has Rendered");
      this.contentRendered = true;
    },

    onBlobGenerate(blob) {
      console.log(blob);
    },
  },

  components: {
    VueHtml2pdf,
    PdfContent,
    ControlsContainer,
  },
};
</script>

<style lang="scss">
html,
body {
  width: 100%;
  padding: 0;
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #141e30; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to bottom,
    #243b55,
    #141e30
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom,
    #243b55,
    #141e30
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  flex-direction: column;
  overflow: hidden;

  .title-container {
    min-height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
  }

  .title-header {
    color: #fff;
    padding: 25px 50px;
    border: 5px solid #fff;
    border-radius: 5px;
    opacity: 0;
    @include fadeintop(0.2s, 0);
  }
}
</style>
