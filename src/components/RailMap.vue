<template>
  <div class="svg-container"></div>
</template>

<script>
import * as d3 from 'd3'
export default {
  data() {
    return {
      mapp: 'hello',
      svg: null,
      width: 800,
      height: 600,
      VIEWBOX: ``,
      nodes: [
        {
          id: 1,
          title: '1',
          content: '',
          childrens: []
        },
        {
          id: 2,
          title: '2',
          content: '',
          childrens: []
        },
        {
          id: 3,
          title: '',
          content: '',
          childrens: []
        },
        {
          id: 4,
          title: '',
          content: '',
          childrens: []
        },
        {
          id: 5,
          title: '',
          content: '',
          childrens: []
        },
        {
          id: 6,
          title: '',
          content: '',
          childrens: []
        }
      ]
    }
  },
  mounted() {
    this.VIEWBOX = `0 0 ${this.width} ${this.height}`
    this.drawMap()
  },
  methods: {
    drawMap() {
      this.svg = d3
        .select('.svg-container')
        .append('svg')
        .attr('width', this.width)
        .attr('height', this.height)
        .attr('viewBox', this.VIEWBOX)

      for (const node of this.nodes) {
        let g = this.svg.append('g').attr('class', 'station').attr('id', node.id)
        g.append('circle')
          .attr('r', 30)
          .attr('cx', Math.floor(Math.random() * (this.width - 200) + 200))
          .attr('cy', Math.floor(Math.random() * (this.height - 100) + 100))
      }
      d3.selectAll('circle')
        .on('mouseover', function () {
          d3.select(this).transition().attr('r', 50)
          console.log('mouseover', this)
        })
        .on('mouseout', function () {
          d3.select(this).transition().attr('r', 30)
          console.log('mouseout', this)
        })
    }
  }
}
</script>

<style>
.svg-container {
  border: 1px solid black;
}
.station {
  fill: red;
  stroke: black;
  stroke-width: 1;
  transition-duration: 0.5s;
}
</style>