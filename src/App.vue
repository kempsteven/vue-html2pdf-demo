<template>
	<div id="app">
		<section class="title-container">
			<h1 class="title-header">
				Vue HTML2PDF
			</h1>
		</section>

		<controls-container
			:progress="progress"
			@generateReport="downloadPdf()"
		/>

		<vue-html2pdf
			:show-layout="controlValue.showLayout"
			:preview-in-newtab="controlValue.previewInNewtab"
			:paginate-elements-by-height="controlValue.paginateElementsByHeight"
			:filename="controlValue.filename"
			:pdf-quality="controlValue.pdfQuality"
			:pdf-format="controlValue.pdfFormat"
			@progress="onProgress($event)"
			@hasStartedDownload="hasStartedDownload()"
			@hasDownloaded="hasDownloaded()"
			ref="html2Pdf"
		>
			<pdf-content
				@domRendered="domRendered()"
				slot="pdf-content"
			/>
		</vue-html2pdf>
	</div>
</template>

<script>
import PdfContent from '@/components/PdfContent'
import VueHtml2pdf from '@/components/VueHtml2pdf'
import ControlsContainer from '@/components/ControlsContainer'
// import VueHtml2pdf from 'vue-html2pdf'
import { mapFields } from 'vuex-map-fields'

export default {
	name: 'app',

	data () {
		return {
			contentRendered: false,
			progress: 0,
			generatingPdf: false,
			pdfDownloaded: false
		}
	},

	computed: {
        ...mapFields([
            'controlValue'
        ]),
    },

	methods: {
		async downloadPdf () {
			if (!await this.validateControlValue()) return

			this.$refs.html2Pdf.generatePdf()
		},

		validateControlValue () {
			if (this.controlValue.pdfQuality > 2) {
				alert('pdf-quality value should only be 0 - 2')
				this.controlValue.pdfQuality = 2

				return false
			}

			if (!this.controlValue.paginateElementsByHeight) {
				alert('paginate-elements-by-height value cannot be empty')
				this.controlValue.paginateElementsByHeight = 1400
				
				return false
			}

			const paperSizes = [
				'a0', 'a1', 'a2', 'a3',
				'a4', 'a5', 'a6', 'a7',
				'a8', 'a9', 'a10'
			]

			if (!paperSizes.includes(this.controlValue.pdfFormat)) {
				alert(`pdf-format value should only be ${paperSizes}`)
				this.controlValue.pdfFormat = 'a4'

				return false
			}

			return true
		},

		onProgress (progress) {
			this.progress = progress
			console.log(`PDF generation progress: ${progress}%`)
		},

		hasStartedDownload () {
			console.log(`PDF has started generation`)
		},

		hasDownloaded () {
			this.pdfDownloaded = true
			console.log(`PDF has downloaded yehey`)
		},

		domRendered () {
			console.log('Dom Has Rendered')
			this.contentRendered = true
		}
	},

	components: {
		VueHtml2pdf,
		PdfContent,
		ControlsContainer
	},
}
</script>

<style lang="scss">
html, body {
	width: 100%;
	padding: 0;
	margin: 0;
	
}

#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #141414;
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
