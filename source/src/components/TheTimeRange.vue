<script lang="ts" setup>
import dayjs from 'dayjs'
import { debounce } from 'lodash-es'
interface Props {
  show: boolean
  // 标题内容
  title?: string
  input?: [string, string]

  okBefore?: any
}

const { input = [], okBefore } = defineProps<Props>()
const emits = defineEmits(['ok', 'close', 'update:input'])

const show = ref(true)

// 根据当前年份，向前推 n 年
const generateYear = computed(() => {
  const year = new Date().getFullYear()
  const arr = []
  for (let i = 0; i < 2; i++) {
    arr.push(year - i)
  }
  return arr.reverse()
})

// 生成月份数组
const generateMonth = computed(() => {
  const month = []
  for (let i = 1; i <= 12; i++) month.push(i)
  return month
})

// 使用 dayjs 根据当前选中的年月份，生成日份数组
const generateDate = (year: string, month: string) => {
  const daysInMonth = dayjs(`${year}-${month}`).daysInMonth()

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  return days
}

const currentRenderTime = ref<[number[], number[], number[]]>([[], [], []])

// 一开始接收的值,方便恢复
const init = {
  time: {
    start: input[0],
    end: input[1],
  },
}
const time = reactive({
  start: input[0] ? dayjs(input[0]).format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'),
  end: input[1] ? dayjs(input[1]).format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'),
})

// 点击确定
const okHandler = async () => {
  // 如果有 okBefore 钩子，执行钩子
  if (okBefore) {
    const result = await okBefore([time.start, time.end])

    if (result === false) return
  }
  show.value = false

  emits('update:input', [time.start, time.end])

  emits('ok', time)
  emits('close')
}
const backHandler = () => {
  show.value = false
  time.start = init.time.start as any
  time.end = init.time.end as any
  emits('update:input', [time.start, time.end])

  emits('close')
}

onMounted(() => {
  const d = dayjs(time.start)
  const year = Number(d.format('YYYY'))
  const month = Number(d.format('MM'))
  const date = Number(d.format('DD'))
  scrollTo(year, month, date)
})
let timeCheckedKey: keyof typeof time = $ref('start')

// 滚动事件是否有效
let scrollValid = true
const changeTimeCheck = (key: keyof typeof time) => {
  timeCheckedKey = key

  const d = dayjs(time[timeCheckedKey])

  // 滚动过程中，使 scroll 事件无效
  scrollValid = false
  setTimeout(() => {
    scrollTo(Number(d.format('YYYY')), Number(d.format('MM')), Number(d.format('DD')))
  }, 60)
}
currentRenderTime.value = generate(time.start || dayjs().format('YYYY-MM-DD')) as any

// 生成指定年月日
function generate(time?: string) {
  const d = dayjs(time)
  const year = d.year()
  const month = d.format('MM')
  const days = generateDate(year as any, month)
  return [generateYear.value, generateMonth.value, days] as const
}

// 滚动到指定年月日
const yearEl = ref<HTMLElement>()
const monthEl = ref<HTMLElement>()
const dateEl = ref<HTMLElement>()
function scrollTo(year: number, month: number, date: number) {
  const yearIndex = generateYear.value.indexOf(year)
  const monthIndex = generateMonth.value.indexOf(month)
  const dateIndex = generateDate(year as any, month as any).indexOf(date)

  const itemHeight = yearEl.value?.childNodes[0].offsetHeight

  yearEl.value?.scrollTo({
    top: yearIndex * itemHeight,
    behavior: 'smooth',
  })
  monthEl.value?.scrollTo({
    top: monthIndex * itemHeight,
    behavior: 'smooth',
  })
  dateEl.value?.scrollTo({
    top: dateIndex * itemHeight,
    behavior: 'smooth',
  })
}

// 手指按到滚动体上时，使 scroll 事件有效
const scrollTouchStart = () => {
  scrollValid = true
}

/**
 * 滚动事件处理函数
 */
const scrollHandler = debounce((e: any, type: 'year' | 'month' | 'date') => {
  if (!scrollValid) return
  let d = dayjs(time[timeCheckedKey])
  const index = Math.ceil(e.target.scrollTop / e.target.childNodes[0].offsetHeight)
  const arrIndexData: Data<number> = {
    year: 0,
    month: 1,
    date: 2,
  }
  let value = currentRenderTime.value[arrIndexData[type]][index]
  if (type === 'month') value = value - 1
  if ([undefined, null, NaN].includes(value as any)) return

  d = d.set(type, value)
  time[timeCheckedKey] = d.format('YYYY-MM-DD')
  currentRenderTime.value = generate(time[timeCheckedKey]) as any

  // 最大最小值判断
  if (timeCheckedKey === 'end' && dayjs(time.end) < dayjs(time.start)) {
    const d = dayjs(time.start)
    time[timeCheckedKey] = d.format('YYYY-MM-DD')
    scrollTo(Number(d.format('YYYY')), Number(d.format('MM')), Number(d.format('DD')))
  }
  else if (timeCheckedKey === 'start' && dayjs(time.end) < dayjs(time.start)) {
    const d = dayjs(time.end)
    time[timeCheckedKey] = d.format('YYYY-MM-DD')
    scrollTo(Number(d.format('YYYY')), Number(d.format('MM')), Number(d.format('DD')))
  }
}, 100)
</script>

<template>
  <Teleport to="body">
    <van-overlay v-bind="$attrs" :show="show" :lock-scroll="false" @click="emits('close')">
      <div class="containerBox h-50rem" @click.stop="">
        <div class="header flex justify-between items-center">
          <van-icon name="arrow-left" @click="backHandler" />
          <p>选择日期</p>
          <span class="text-2rem" @click="okHandler">确定</span>
        </div>
        <div class="input h-6.83rem flex items-center border border-#eaeaea mt-2.5rem mx-3.75rem rounded-.5rem">
          <img src="../assets/images/components/dateIcon.png" class="icon w-2rem h-2rem block ml-3.17rem mr-2.5rem">
          <span
            class="w-19.5rem whitespace-nowrap block"
            :class="{ active: timeCheckedKey === 'start' }"
            @click="changeTimeCheck('start')"
          >{{ dayjs(time.start).format('YYYY年MM月DD日') }}</span>
          <img src="../assets/images/components/dateTransIcon.png" class="w-1.83rem mx-1.5rem">
          <span
            class="w-19.5rem whitespace-nowrap block"
            :class="{ active: timeCheckedKey === 'end' }"
            @click="changeTimeCheck('end')"
          >{{ dayjs(time.end).format('YYYY年MM月DD日') }}</span>
        </div>

        <ul class="dateSelect">
          <li class="select-slide year">
            <div ref="yearEl" class="list" @touchstart="scrollTouchStart" @scroll="scrollHandler($event, 'year')">
              <div class="item" />
              <div v-for="(item, index) in currentRenderTime[0]" :key="index" class="item">
                {{ item }}
              </div>
              <div class="item" />
            </div>
          </li>
          <li class="select-slide month">
            <div ref="monthEl" class="list" @touchstart="scrollTouchStart" @scroll="scrollHandler($event, 'month')">
              <div class="item" />
              <div v-for="(item, index) in currentRenderTime[1]" :key="index" class="item">
                {{ item }}
              </div>
              <div class="item" />
            </div>
          </li>
          <li class="select-slide date">
            <div ref="dateEl" class="list" @touchstart="scrollTouchStart" @scroll="scrollHandler($event, 'date')">
              <div class="item" />
              <div v-for="(item, index) in currentRenderTime[2]" :key="index" class="item">
                {{ item }}
              </div>
              <div class="item" />
            </div>
          </li>
        </ul>
      </div>
    </van-overlay>
  </Teleport>
</template>

<style lang="scss" scoped>
.containerBox {
  position: fixed;
  bottom: 0;
  left:0;
  width: 100%;
  font-size: 2.5rem;
  background-color: white;
  z-index: 999;

  .header{line-height: 7.5rem;padding: 0 2.5rem;border-bottom: 1px solid #f8f8f8;}
  .input{font-size: 2.5rem;color: #ccc;
    .active{color: #333;}
  }

  .dateSelect{display: flex;justify-content: space-around;align-items: center;text-align: center;
    --slideHeight: 18.5rem;
    margin-top: 4.17rem;
    .select-slide{
      width: 16.67rem;
      color: #000;
      position: relative;
      .list{
        height: var(--slideHeight);
        overflow-y: auto;
        line-height: calc(var(--slideHeight) / 3);
        scroll-snap-type: y mandatory;
        overscroll-behavior: contain;
        scroll-behavior: smooth;
        &::-webkit-scrollbar{width: 0;display: none;}

        .item{
          scroll-snap-align: start;
          height: calc(var(--slideHeight) / 3);
        }
      }

      &::before,&::after{
        content: '';
        display: block;
        background-color: rgba(255,255,255,.5);
        width: 100%;
        height: calc(var(--slideHeight) / 3);
        position: absolute;
        left:0;
        pointer-events: none;
      }
      &::before{top:0;border-bottom: 1px solid #f0f0f0;}
      &::after{bottom: 0;border-top: 1px solid #f0f0f0;}
      &::before{
        // z-index: -1;
        // content: '';
        // width: 100%;height: calc(var(--slideHeight) / 3);
        // border: 1px solid #efefef;
        // border-left: none;
        // border-right: 0;
        // position: absolute;
        // top: 50%;
        // left: 0;
        // transform: translateY(-50%);
        // pointer-events: none;
      }
    }
  }
}
</style>
