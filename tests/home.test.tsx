import { screen, render } from '@testing-library/react'
import { vi } from 'vitest'

import HomePage from '../app/page'

vi.mock('@clerk/nextjs', () => ({
  auth: () => new Promise((resolve) => resolve({ userId: 'AZCSA' })),
  ClerkProvider: ({ children }) => <div>{children}</div>,
}))

test('home', async () => {
  render(await HomePage())
  expect(screen.getByText(/get started/i)).toBeInTheDocument()
})
