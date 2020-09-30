<template>
  <section class="pdf-content">
    <section class="report-info">
      <section class="image-container">
        <img
          class="user-image"
          src="https://i.imgur.com/wKblc.jpg"
          alt="User Image"
          ref="userImage"
        />
      </section>

      <section class="user-details">
        <h4 class="user-name">Mogul Khan Touch This</h4>

        <span class="detail-container">
          <span class="detail-label">Game:</span>
          Game No. 3
        </span>

        <span class="detail-container">
          <span class="detail-label">Date and Time</span>
          November 11, 2019 1:00 PM - 2:23 PM
        </span>

        <span class="detail-container">
          <span class="detail-label">Game Replay Link:</span>

          <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">https://www.youtube.com/watch?v=dQw4w9WgXcQ</a>
        </span>
      </section>
    </section>

    <section class="chart-container" v-for="(val, key) in 10" :key="key">
      <h4 class="time">November 11, 2019 1:00 PM - 2:23 PM</h4>

      <apexchart type="area" height="100%" width="100%" :options="chartOptions" :series="series" />
    </section>
  </section>
</template>

<script>
export default {
  data() {
    return {
      series: [
        {
          name: "Level",
          data: [
            { y: 1, x: "11/11/2019 13:00:00" },
            { y: 1, x: "11/11/2019 13:01:00" },
            { y: 2, x: "11/11/2019 13:02:00" },
            { y: 4, x: "11/11/2019 13:03:00" },
            { y: 5, x: "11/11/2019 14:04:00" },
          ],
        },
        {
          name: "Experience",
          data: [
            { y: 5, x: "11/11/2019 13:00:00" },
            { y: 5, x: "11/11/2019 13:01:00" },
            { y: 10, x: "11/11/2019 13:02:00" },
            { y: 12, x: "11/11/2019 13:03:00" },
            { y: 20, x: "11/11/2019 14:04:00" },
          ],
        },
        {
          name: "Gold",
          data: [
            { y: 10, x: "11/11/2019 13:00:00" },
            { y: 10, x: "11/11/2019 13:01:00" },
            { y: 20, x: "11/11/2019 13:02:00" },
            { y: 30, x: "11/11/2019 13:03:00" },
            { y: 50, x: "11/11/2019 14:04:00" },
          ],
        },
      ],

      chartOptions: {
        dataLabels: {
          enabled: false,

          style: {
            colors: ["#fff"],
          },
        },

        stroke: {
          curve: "smooth",
        },

        chart: {
          toolbar: {
            show: false,

            tools: {
              download: false,
            },
          },

          animations: {
            enabled: false,

            animateGradually: {
              enabled: false,
            },

            dynamicAnimation: {
              enabled: false,
            },
          },
        },

        tooltip: {
          enabled: true,
          // theme: true,
          x: {
            show: true,
            format: "MMM dd, yyyy HH:mm",
          },
        },

        legend: {
          show: true,
          labels: {
            useSeriesColors: false,
          },
          onItemClick: {
            toggleDataSeries: false,
          },
          onItemHover: {
            highlightDataSeries: true,
          },
        },

        xaxis: {
          labels: {
            style: {
              // colors: '#fff',
            },
          },

          type: "datetime",
        },

        yaxis: {
          labels: {
            style: {
              // color: '#fff',
            },

            formatter: (value) => {
              return value;
            },
          },

          type: "text",
        },
      },
    };
  },

  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.$emit("domRendered");
      }, 1000);
    });
  },
};
</script>

<style lang="scss" scoped>
.pdf-content {
  width: 100%;
  background: #fff;

  .report-info {
    display: flex;
    padding: 20px;
    padding-bottom: 0px;

    .image-container {
      width: 75px;
      height: 75px;
      border-radius: 50%;
      overflow: hidden;
      position: relative;
      margin-right: 25px;
      border: 1px solid #dadada;

      .user-image {
        height: 100%;
        min-width: 100%;
        margin-left: 50%;
        transform: translateX(-50%);
      }
    }

    .user-details {
      display: flex;
      flex-direction: column;
      flex-shrink: 0;

      .user-name {
        margin-bottom: 10px;
        flex-shrink: 0;
      }

      .detail-container {
        font-size: 13px;
        flex-shrink: 0;

        &:not(:last-child) {
          margin-bottom: 10px;
        }

        .detail-label {
          font-weight: 600;
          margin-right: 5px;
          font-size: 13px;
        }
      }
    }
  }

  .chart-container {
    width: 100%;
    height: 320px;
    padding: 20px;
    pointer-events: none;

    &:not(:last-child) {
      margin-bottom: 15px;
    }
  }
}
</style>