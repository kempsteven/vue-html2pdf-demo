<template>
	<div id="app">
		<section class="demo-container">
			<h1 class="container-title">
				Vue Html2Pdf Demo
			</h1>

			<section class="progress-container">
				<div class="progress-bar">
					<div
						class="progress"
						:style="`width: ${progress}%;`"
					/>
				</div>

				<section class="generating-label">
					<span class="label-title">
						{{ pdfDownloaded ? 'PDF Generated' : 'Generating PDF' }}
					</span>

					<span class="label-progress">
						{{ `${ progress } %` }}
					</span>
				</section>
			</section>

			<section class="btn-wrapper">
				<h3 class="btn-header">
					Click button to download PDF!
				</h3>

				<button class="download-pdf" @click="downloadPdf()" :disabled="!contentRendered">
					Download PDF
				</button>
			</section>
		</section>

		<vue-html2pdf
			:show-layout="true"
			:split-elements-by-height="1200"
			filename="Axe Report"
			:pdf-quality="2"
			pdf-format="a4"
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
// import VueHtml2pdf from '@/components/VueHtml2pdf'
import PdfContent from '@/components/PdfContent'
import VueHtml2pdf from 'vue-html2pdf'
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

	methods: {
		downloadPdf () {
			this.$refs.html2Pdf.generatePdf()
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
		PdfContent
	},
}
</script>

<style lang="scss">
html, body {
	width: 100%;
	height: 100%;
	padding: 0;
	margin: 0;
}

#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	background: #141414;

	.demo-container {
		background: #fff;
		padding: 25px;
		border-radius: 5px;
		box-shadow: 5px 5px 10px #000000;
		margin-top: 150px;
		width: 500px;
		opacity: 0;
		@include fadeintop(0.6s, 0.2s);

		.container-title {
			text-align: center;
		}

		.progress-container {
			width: 100%;
			margin: 50px 0;

			.progress-bar {
				width: 100%;
				height: 10px;
				border: 1px solid #585858;
				border-radius: 5px;
				margin-bottom: 5px;

				.progress {
					width: 0%;
					height: 100%;
					transition: 0.3s;
					background: #2c3e50;
				}
			}

			.generating-label {
				width: 100%;
				display: flex;
				justify-content: space-between;
			}
		}

		.btn-wrapper {
			display: flex;
			flex-direction: column;
			align-items: center;

			.btn-header {
				margin-bottom: 15px;
			}

			.download-pdf {
				border: 0;
				padding: 25px 35px;
				border-radius: 5px;
				color: #fff;
				background: #2c3e50;
				transition: 0.3s;

				&:disabled {
					opacity: 0.5;
				}
			}
		}
	}
}
</style>
