import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../src/app/(pages)/snippets/1/page'

describe('Page', () => {
  it('renders a heading', () => {
    // 페이지 컴포넌트를 렌더링합니다.
    render(<Page />)

    // 페이지에서 레벨 1 헤딩<h1>을 찾습니다.
    const heading = screen.getByRole('heading', { level: 1 })

    // 헤딩이 문서에 존재하는지 확인합니다.
    expect(heading).toBeInTheDocument()
  })
})
