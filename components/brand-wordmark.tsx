export function BrandWordmark({ inverse = false }: { inverse?: boolean }) {
  return <span className={inverse ? 'brand-wordmark is-inverse' : 'brand-wordmark'}>
    <strong>造物间</strong>
    <small>AI 项目工坊</small>
  </span>;
}
