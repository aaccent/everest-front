import React, { PropsWithChildren, useContext, useEffect, useRef } from 'react'
import { cleanup, renderHook, RenderHookResult, screen } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

import { Form, FormContext, FormImperativeRef } from '@/features/form/form'
import { InputErrorCode } from '@/features/form/useInputRegister'
import { InputsMap } from '@/features/form/form.types'

interface TestInputProps {
  name: string
  placeholder?: string
  required?: boolean
}

function TestInput({ ...input }: TestInputProps) {
  const { registerInput, unregisterInput } = useContext(FormContext)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const errorRef = useRef<InputErrorCode | null>(null)

  useEffect(() => {
    registerInput(input.name, {
      type: 'text',
      get value() {
        return inputRef.current?.value || ''
      },
      get required() {
        return inputRef.current?.required || false
      },
      get error() {
        return errorRef.current
      },
      setError(errCode) {
        errorRef.current = typeof errCode === 'function' ? errCode(errorRef.current) : errCode
      },
    })

    return () => unregisterInput(input.name)
  }, [])

  return <input type='text' {...input} ref={inputRef} />
}

function TestContext() {
  return useContext(FormContext)
}

interface TestComponentProps extends PropsWithChildren {
  onCompleteFill?: () => void
  onErrorFill?: () => void
}

function TestComponent({ children, ...props }: TestComponentProps) {
  const formRef = useRef<FormImperativeRef>(null)

  return (
    <Form ref={formRef} {...props}>
      {children}
      <button type='submit'>submit</button>
    </Form>
  )
}

class FormTests {
  hookResult: RenderHookResult<ReturnType<typeof TestContext>, unknown>

  constructor(inputs: React.ReactNode, props?: Omit<TestComponentProps, 'children'>) {
    this.hookResult = renderHook(TestContext, {
      wrapper: ({ children }) => {
        return (
          <TestComponent {...props}>
            {inputs}
            {children}
          </TestComponent>
        )
      },
    })
  }

  public inputsRef(): InputsMap {
    return this.hookResult.result.current.inputsMap
  }
}

afterEach(cleanup)

describe('Base tests', () => {
  test('Should render Form with one input', async () => {
    const inputName = 'tel'
    const formTests = new FormTests(<TestInput name={inputName} />)

    expect(formTests.inputsRef()).haveOwnProperty(inputName)
  })

  test('Should render Form with two input', async () => {
    const inputNames = ['tel', 'name']

    const formTests = new FormTests([
      <TestInput key={1} name={inputNames[0]} />,
      <TestInput key={2} name={inputNames[1]} />,
    ])

    expect(formTests.inputsRef()).haveOwnProperty(inputNames[0])
    expect(formTests.inputsRef()).haveOwnProperty(inputNames[1])
  })

  test('Should change value after change', async () => {
    const user = userEvent.setup()

    const inputNames = ['tel', 'name']
    const formTests = new FormTests([
      <TestInput key={1} name={inputNames[0]} placeholder={inputNames[0]} />,
      <TestInput key={2} name={inputNames[1]} placeholder={inputNames[1]} />,
    ])

    expect(formTests.inputsRef()).haveOwnProperty(inputNames[0])
    expect(formTests.inputsRef()).haveOwnProperty(inputNames[1])

    const texts = ['123456789', 'Some name']
    await user.type(screen.getByPlaceholderText(inputNames[0]), texts[0])
    await user.type(screen.getByPlaceholderText(inputNames[1]), texts[1])

    expect(formTests.inputsRef()[inputNames[0]].value).toBe(texts[0])
    expect(formTests.inputsRef()[inputNames[1]].value).toBe(texts[1])
  })

  test('Should return "required" value from Input', async () => {
    const inputNames = ['tel', 'name']

    const formTests = new FormTests([
      <TestInput key={1} name={inputNames[0]} placeholder={inputNames[0]} required />,
      <TestInput key={2} name={inputNames[1]} placeholder={inputNames[1]} required={false} />,
    ])

    expect(formTests.inputsRef()[inputNames[0]].required).toBeTruthy()
    expect(formTests.inputsRef()[inputNames[1]].required).toBeFalsy()
  })

  test('Should set error on required input', async () => {
    const user = userEvent.setup()

    const inputNames = ['tel', 'name']
    const formTests = new FormTests([
      <TestInput key={1} name={inputNames[0]} placeholder={inputNames[0]} required />,
      <TestInput key={2} name={inputNames[1]} placeholder={inputNames[1]} />,
    ])

    await user.click(screen.getByText('submit'))

    expect(formTests.inputsRef()[inputNames[0]].error).not.toEqual(null)
    expect(formTests.inputsRef()[inputNames[1]].error).toEqual(null)
  })

  // TODO: fix test. Now is a false wrong
  test.skip('Should remove error from input', async () => {
    const user = userEvent.setup()

    const inputNames = ['tel', 'name']
    const formTests = new FormTests([
      <TestInput key={1} name={inputNames[0]} placeholder={inputNames[0]} required />,
      <TestInput key={2} name={inputNames[1]} placeholder={inputNames[1]} />,
    ])

    await user.click(screen.getByText('submit'))
    expect(formTests.inputsRef()[inputNames[0]].error).not.toEqual(null)

    await user.type(screen.getByPlaceholderText(inputNames[0]), 'test')

    expect(formTests.inputsRef()[inputNames[0]].error).toEqual(null)
    expect(formTests.inputsRef()[inputNames[1]].error).toEqual(null)
  })

  test('Should call onCompleteFill function after filling all inputs', async () => {
    const user = userEvent.setup()

    const onCompleteFillMock = vi.fn()

    const inputNames = ['tel', 'name']
    const formTests = new FormTests(
      [
        <TestInput key={1} name={inputNames[0]} placeholder={inputNames[0]} required />,
        <TestInput key={2} name={inputNames[1]} placeholder={inputNames[1]} required />,
      ],
      { onCompleteFill: onCompleteFillMock },
    )

    await user.type(screen.getByPlaceholderText(inputNames[0]), 't')
    expect(onCompleteFillMock).not.toHaveBeenCalledOnce()

    await user.type(screen.getByPlaceholderText(inputNames[1]), 't')
    expect(onCompleteFillMock).toHaveBeenCalledTimes(1)
  })

  test('Should call onErrorFill function after wrong filling all inputs', async () => {
    const user = userEvent.setup()

    const onCompleteFillMock = vi.fn()
    const onErrorFillMock = vi.fn()

    const inputNames = ['tel', 'name']
    new FormTests(
      [
        <TestInput key={1} name={inputNames[0]} placeholder={inputNames[0]} required />,
        <TestInput key={2} name={inputNames[1]} placeholder={inputNames[1]} required />,
      ],
      { onCompleteFill: onCompleteFillMock, onErrorFill: onErrorFillMock },
    )

    await user.type(screen.getByPlaceholderText(inputNames[0]), 't')
    expect(onCompleteFillMock).not.toHaveBeenCalledOnce()
    expect(onErrorFillMock).toHaveBeenCalledTimes(1)

    await user.type(screen.getByPlaceholderText(inputNames[1]), 't')
    expect(onCompleteFillMock).toHaveBeenCalledTimes(1)
    expect(onErrorFillMock).toHaveBeenCalledTimes(1)

    await user.clear(screen.getByPlaceholderText(inputNames[1]))
    expect(onCompleteFillMock).toHaveBeenCalledTimes(1)
    expect(onErrorFillMock).toHaveBeenCalledTimes(2)
  })
})
