import React, { useState, useEffect } from 'react'
import { Exam } from '@renderer/utils/dataAccess'
import { ConfigProvider, Input, Select, Radio, DatePicker, InputNumber, Switch } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { Paperclip, Clock, LetterText } from 'lucide-react'
import SubjectBadge from '@renderer/components/shared/SubjectBadge'
import dayjs from 'dayjs'

interface EventFormProps {
  examData?: Partial<Exam | null>
  onFieldChange: (field: keyof Exam, value: any) => void
}

export default function EventForm({ examData = null, onFieldChange }: EventFormProps): JSX.Element {
  const [isExamOpen, setIsExamOpen] = useState(false)

  return (
    <div className="space-y-5 overflow-y-auto pr-2 custom-scrollbar max-h-[75%] ">
      <div className="flex items-center gap-3">
        <h3 className="text-xl font-bold">Grade Type:</h3>

        <ConfigProvider
          theme={{
            components: {
              Select: {
                colorBgContainer: '#323e5a',
                colorText: '#ffffff',
                colorBorder: 'transparent',
                colorTextPlaceholder: '#ffffff',

                colorBgElevated: '#323e5a',
                optionSelectedBg: '#14532D'
              }
            }
          }}
        >
          <Select
            size="large"
            style={{ width: 200 }}
            placeholder="Select an option"
            value={undefined}
            onChange={(value) => console.log('Selected:', value)}
            options={[
              { label: 'Custom Option 1', value: 'custom1' },
              { label: 'Custom Option 2', value: 'custom2' },
              { label: 'Custom Option 3', value: 'custom3' }
            ]}
          ></Select>
        </ConfigProvider>

        <ConfigProvider
          theme={{
            components: {
              Select: {
                colorBgContainer: '#323e5a',
                colorText: '#ffffff',
                colorBorder: 'transparent',
                colorTextPlaceholder: '#ffffff',
                colorBgElevated: '#323e5a',
                optionSelectedBg: '#14532D'
              }
            }
          }}
        ></ConfigProvider>
      </div>
      <ConfigProvider
        theme={{
          components: {
            Input: {
              colorBgContainer: '#323e5a',
              colorText: '#ffffff',
              colorBorder: 'transparent',
              colorTextPlaceholder: '#ffffff'
            }
          }
        }}
      >
        <Input
          value={examData?.title}
          placeholder="Exam Title"
          size="large"
          onChange={(e) => onFieldChange('title', e.target.value)}
          maxLength={35}
          prefix={
            <div className="mr-2">
              <Paperclip></Paperclip>
            </div>
          }
        ></Input>

        <div className="relative w-full">
          <div className="absolute top-3 left-3 z-10 text-white">
            <LetterText size={20} />
          </div>
          <TextArea
            size="large"
            maxLength={100}
            onChange={(e) => onFieldChange('description', e.target.value)}
            placeholder="Description / Notes"
            style={{ height: 120, paddingLeft: '40px', maxHeight: 360, minHeight: 45 }}
          />
        </div>
      </ConfigProvider>
      <div>
        <ConfigProvider
          theme={{
            components: {
              DatePicker: {
                colorBgContainer: '#323e5a',
                colorText: '#ffffff',
                activeBg: '#323e5a',
                colorTextPlaceholder: 'gray',

                // --- Popup Calendar Styles ---
                colorBgElevated: '#323e5a', // Background of the popup calendar
                colorTextHeading: '#ffffff', // Color for "Jan 2025", "Su Mo Tu..."
                colorTextDisabled: 'gray', // Color for dates outside the current month

                // --- Day Cell Styles ---
                cellHoverBg: '#2a344d', // Background of day cell on hover
                colorPrimary: '#14532D' // Background color for the selected day
              }
            }
          }}
        >
          <DatePicker
            prefix={
              <div className="mr-2">
                <Clock></Clock>
              </div>
            }
            value={dayjs(examData?.date || Date.now())}
            className="transition-colors"
            defaultValue={dayjs('01/01/2025', 'DD/MM/YYYY')}
            format={'DD/MM/YYYY'}
            size={'large'}
            style={{
              width: '100%',
              height: '70px',
              border: 'none',
              color: '#ffffff'
            }}
            onSubmit={(date) => {
              onFieldChange('date', date.valueOf().toString())
            }}
            onChange={(date) => {
              onFieldChange('date', date.valueOf().toString())
            }}
          />
        </ConfigProvider>
      </div>

      <div className="flex justify-between w-full">
        {!isExamOpen && (
          <div className="flex items-center gap-3 justify-start">
            <h3 className="text-xl font-bold">Grade in points (0-15):</h3>
            <ConfigProvider
              theme={{
                components: {
                  InputNumber: {
                    colorBgContainer: '#323e5a',

                    hoverBg: '#323e5a',
                    hoverBorderColor: 'transparent',
                    handleBg: '#323e5a',
                    handleBorderColor: '#323e5a',
                    handleHoverColor: '#ffffff',
                    activeBg: '#323e5a',
                    colorText: '#ffffff',
                    fontSize: 30
                  }
                }
              }}
            >
              <InputNumber
                style={{
                  border: 'none',
                  color: '#ffffff',
                  width: '15%',
                  height: '50px',
                  textAlign: 'center'
                }}
                min={0}
                max={15}
                onSubmit={(grade) => {
                  console.log('Grade submitted:', grade)
                  onFieldChange('grade', String(grade))
                }}
                onChange={(grade) => {
                  console.log('Grade submitted:', grade)
                  onFieldChange('grade', String(grade))
                }}
                placeholder="Enter grade (0-15)"
                formatter={(value) => (value !== undefined && value !== null ? `${value}P` : '')}
                parser={(displayValue) =>
                  displayValue ? Number(displayValue.replace('P', '')) : 0
                }
              />
            </ConfigProvider>
          </div>
        )}
        <div
          className={`flex gap-5 items-center h-[80px] ml-3 ${isExamOpen ? 'w-full' : 'w-[35%]'} justify-end mr-10`}
        >
          <h3 className="font-bold text-2xl">Exam open: </h3>
          <Switch
            checked={isExamOpen}
            onChange={() => {
              setIsExamOpen(!isExamOpen)
            }}
            className="w-10"
            style={{
              backgroundColor: isExamOpen ? '#5FA0C2' : '#42485f',
              borderRadius: '12px',
              transition: 'background-color 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: isExamOpen ? 'flex-end' : 'flex-start',
              transform: 'scale(1.5)'
            }}
          ></Switch>
        </div>
      </div>
    </div>
  )
}
