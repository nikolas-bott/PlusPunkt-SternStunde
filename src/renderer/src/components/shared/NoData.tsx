import { Empty, ConfigProvider } from 'antd'

export default function NoData(): JSX.Element {
  return (
    <ConfigProvider
      theme={{
        components: {
          Empty: {
            colorTextDescription: '#fffff'
          }
        }
      }}
    >
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={<span className="font-bold">No Data found!</span>}
      />
    </ConfigProvider>
  )
}
