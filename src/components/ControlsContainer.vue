<template>
    <section class="control-container">
        <h3 class="control-header">
            Component Props Controls
        </h3>

        <section class="item-container">
            <section
                class="control-item"
                v-for="(control, key) in controls"
                :key="key"
            >
                <section class="control">
                    <span class="item-label">
                        {{ control.label }}
                    </span>

                    <input
                        :class="
                            control.inputType === 'checkbox'
                                ? 'input-checkbox'
                                : 'input-box'
                        "
                        :type="control.inputType"
                        :value="controlValue[control.vModel]"
                        :checked="controlValue[control.vModel]"

                        @input="setInput(
                            $event,
                            control.vModel,
                            control.inputType
                        )"

                        @change="setInput(
                            $event,
                            control.vModel,
                            control.inputType
                        )"
                    >
                </section>

                <section class="options-container">
                    <section class="options-item">
                        <span class="options-title">
                            Type:
                        </span>

                        <span class="options-value">
                            {{ control.type }}
                        </span>
                    </section>

                    <section class="options-item">
                        <span class="options-title">
                            Options:
                        </span>

                        <span class="options-value">
                            {{ control.options }}
                        </span>
                    </section>
                </section>

                <section v-if="control.label === 'manual-pagination:'">
                    <b>Note:</b> <br>
                    When enabling this prop, the prop <br> <b> paginate-elements-by-height </b> will not be used.
                    Instead the pagination process will rely on the elements with a class "html2pdf__page-break"
                    to know where to page break.
                </section>
            </section>

            <div>
                <b>Note:</b> <br> There is a prop called <b>html-to-pdf-options</b>, if you set a value to
                this prop, the props below will be overridden: <br><br>
                <b>filename</b><br>
                <b>pdf-quality</b><br>
                <b>pdf-format</b><br>
                <b>pdf-orientation</b>.<br><br>
                Any value inputed to those props above will have no effect.
            </div>
        </section>

        <button
            :disabled="isGenerating"
            class="generate-btn"
            @click="$emit('generateReport')"
        >
            {{ isGenerating ? 'Loading...' : 'Generate PDF' }}
        </button>

        <section class="progress-container">
            <div class="progress-bar">
                <div
                    class="progress"
                    :style="`width: ${progress}%;`"
                />
            </div>

            <section class="generating-label" v-if="progress !== 0">
                <span class="label-title">
                    {{ progress === 100 ? 'PDF Generated' : 'Generating PDF' }}
                </span>

                <span class="label-progress">
                    {{ `${ progress } %` }}
                </span>
            </section>
        </section>
    </section>
</template>

<script>
import { mapFields } from 'vuex-map-fields'

export default {
    props: {
        progress: {
            type: Number,
            default: 0
        }
    },

    data () {
        return {
            controls: [
				{
					label: 'show-layout:',
					type: 'Boolean',
                    options: 'true, false',
                    inputType: 'checkbox',
                    vModel: 'showLayout'
                },

                {
					label: 'float-layout:',
					type: 'Boolean',
                    options: 'true, false',
                    inputType: 'checkbox',
                    vModel: 'floatLayout'
                },

                {
					label: 'enable-download:',
					type: 'Boolean',
                    options: 'true, false',
                    inputType: 'checkbox',
                    vModel: 'enableDownload'
                },

                {
					label: 'preview-modal:',
					type: 'Boolean',
                    options: 'true, false',
                    inputType: 'checkbox',
                    vModel: 'previewModal'
                },

                {
					label: 'manual-pagination:',
					type: 'Boolean',
                    options: 'true, false',
                    inputType: 'checkbox',
                    vModel: 'manualPagination'
                },
                
                {
					label: 'paginate-elements-by-height:',
					type: 'Number',
                    options: 'Any Number',
                    inputType: 'number',
                    vModel: 'paginateElementsByHeight'
                },
                
                {
					label: 'filename:',
					type: 'String',
                    options: 'Any String',
                    inputType: 'text',
                    vModel: 'filename'
                },
                
                {
					label: 'pdf-quality:',
					type: 'Number',
                    options: '0 - 2 (Can Have Decimal)',
                    inputType: 'number',
                    vModel: 'pdfQuality'
                },

                {
					label: 'pdf-format:',
					type: 'String',
                    options: 'a0, a1, a2, a3, a4, letter, legal, a5, a6, a7, a8, a9, a10',
                    inputType: 'text',
                    vModel: 'pdfFormat'
                },
                
                {
					label: 'pdf-orientation:',
					type: 'String',
                    options: 'portrait, landscape',
                    inputType: 'text',
                    vModel: 'pdfOrientation'
                },
                
                {
					label: 'pdf-content-width:',
					type: 'String',
                    options: 'Any css sizes (e.g. "800px", "65vw", "70%")',
                    inputType: 'text',
                    vModel: 'pdfContentWidth'
				},
            ],
        }
    },

    computed: {
        ...mapFields([
            'controlValue'
        ]),

        isGenerating () {
            return this.progress !== 0 && this.progress !== 100
        }
    },

    methods: {
        setInput (e, key, inputType) {
            let value = e.target.value

            if (inputType === 'checkbox') {
                value = e.target.checked
            }

            if (inputType === 'number') {
                value = e.target.value
                            ? parseFloat(e.target.value)
                            : 0
            }

            this.$set(this.controlValue, key, value)
        }
    },
}
</script>

<style lang="scss" scoped>
.control-container {
    position: fixed;
    z-index: 999999;
    padding: 15px;
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 5px;
    right: 25px;
    top: 25px;
    width: 405px;
    box-shadow: 5px 5px 10px #000000;
    opacity: 0;
    max-height: calc(100vh - 50px);
    @include fadeintop(0.3s, 0.2s);

    .control-header {
        margin-bottom: 15px;
        padding-bottom: 5px;
        border-bottom: 1px solid #ccc;
    }

    .item-container {
        flex: 1 1 auto;
        overflow: auto;
        margin-bottom: 10px;

        .control-item {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;

            &:not(:last-child) {
                margin-bottom: 10px;
            }

            .control {
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                padding-bottom: 5px;
                border-bottom: 1px solid #ccc;
                width: 100%;

                .item-label  {
                    margin-right: 15px;
                    display: block;
                    padding-bottom: 3px;
                    font-weight: 600;
                    flex-shrink: 0;
                }

                .input-checkbox {
                    width: 20px;
                    height: 20px;
                    cursor: pointer;
                }

                .input-box {
                    flex: 1 1 auto;
                    padding: 5px;
                    border-radius: 3px;
                    border: 1px solid #bbb;
                    width: 0;
                }
            }

            .options-container {
                width: 100%;
                flex-shrink: 0;
                display: flex;
                flex-direction: column;

                .options-item {
                    &:not(:last-child) {
                        margin-bottom: 5px;
                    }

                    .options-title {
                        margin-right: 10px;
                        font-weight: 600;
                    }

                    .options-value {
                        color: #3574b3;
                    }
                }
            }
        }
    }

    .generate-btn {
        border: 0;
        padding: 15px 25px;
        border-radius: 5px;
        color: #fff;
        background: #243B55;
        transition: 0.3s;
        text-align: center;
        cursor: pointer;

        &:disabled {
            opacity: 0.5;
        }
    }

    .progress-container {
        width: 100%;
        margin-top: 10px;

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
}
</style>