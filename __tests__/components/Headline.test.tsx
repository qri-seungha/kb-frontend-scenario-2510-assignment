import { render, screen } from '@testing-library/react'
import Headline from '@/components/Headline'

// 폰트 모킹
jest.mock('@/styles/fonts', () => ({
  oswald: { className: 'oswald-font' }
}))

describe('<Headline>', () => {
  test('Headline 컴포넌트가 정상적으로 렌더링된다', () => {
    render(<Headline />)
    const headline = screen.getByTestId('headline')
    expect(headline).toBeInTheDocument()
  })

  test('메인 제목이 정상적으로 렌더링된다', () => {
    render(<Headline />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(screen.getByText('OMDb API')).toBeInTheDocument()
    expect(screen.getByText(/THE OPEN/i)).toBeInTheDocument()
    expect(screen.getByText(/MOVIE DATABASE/i)).toBeInTheDocument()
  })
})
