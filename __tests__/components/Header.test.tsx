import { render, screen } from '@testing-library/react'
import { usePathname } from 'next/navigation'
import Header from '@/components/Header'

// Next.js 훅 모킹
jest.mock('next/navigation', () => ({
  usePathname: jest.fn()
}))

// 폰트 모킹
jest.mock('@/styles/fonts', () => ({
  oswald: { className: 'oswald-font' }
}))

const menuActiveClass = 'text-[var(--color-primary)]'

describe('<Header>', () => {
  const mockUsePathname = usePathname as jest.Mock

  beforeEach(() => {
    mockUsePathname.mockReturnValue('/')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  // 헤더 기본 렌더링 확인
  test('헤더가 정상적으로 렌더링된다', () => {
    render(<Header />)
    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
    expect(screen.getByText(/OMDbAPI/)).toBeInTheDocument()
  })

  // 메뉴 항목들 올바른 렌더링 확인
  test('메뉴 항목들이 정상적으로 렌더링된다', () => {
    render(<Header />)
    expect(screen.getByText('🔍 Search')).toBeInTheDocument()
    expect(screen.getByText('📽️ Sample Movie')).toBeInTheDocument()
  })

  // 현재 경로에 따른 활성 메뉴 스타일 적용 확인
  test('현재 경로가 "/"일 때 Search 메뉴가 활성화된다', () => {
    mockUsePathname.mockReturnValue('/')
    render(<Header />)
    const searchMenuItem = screen.getByText('🔍 Search').closest('li')
    const sampleMovieMenuItem = screen.getByText('📽️ Sample Movie').closest('li')

    expect(searchMenuItem).toHaveClass(menuActiveClass)
    expect(sampleMovieMenuItem).not.toHaveClass(menuActiveClass)
  })

  test('현재 경로가 "/movies/tt4520988"일 때 Sample Movie 메뉴가 활성화된다', () => {
    mockUsePathname.mockReturnValue('/movies/tt4520988')
    render(<Header />)
    const searchMenuItem = screen.getByText('🔍 Search').closest('li')
    const sampleMovieMenuItem = screen.getByText('📽️ Sample Movie').closest('li')

    expect(searchMenuItem).not.toHaveClass(menuActiveClass)
    expect(sampleMovieMenuItem).toHaveClass(menuActiveClass)
  })

  test('알 수 없는 경로일 때 모든 메뉴가 비활성화된다', () => {
    mockUsePathname.mockReturnValue('/unknown-path')
    render(<Header />)
    const searchMenuItem = screen.getByText('🔍 Search').closest('li')
    const sampleMovieMenuItem = screen.getByText('📽️ Sample Movie').closest('li')

    expect(searchMenuItem).not.toHaveClass(menuActiveClass)
    expect(sampleMovieMenuItem).not.toHaveClass(menuActiveClass)
  })
})
