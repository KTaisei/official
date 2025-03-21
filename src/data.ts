// Sample blog posts data with markdown content
export const blogPosts = [
  {
    id: 1,
    title: 'The Future of TypeScript in 2025',
    excerpt: 'Exploring the upcoming features and improvements in TypeScript that will change how we write code.',
    content: `
## TypeScript's Evolution

TypeScript has come a long way since its initial release in 2012. As we look ahead to 2025, several exciting developments are on the horizon that will reshape how we write code.

### Type System Enhancements

The TypeScript team is working on more powerful type inference capabilities that will reduce the need for explicit type annotations while maintaining type safety:

\`\`\`typescript
// Current TypeScript
function process<T extends object>(obj: T): { [K in keyof T]: T[K] } {
  return { ...obj };
}

// TypeScript 2025 (hypothetical)
function process(obj) {
  return { ...obj }; // Perfect type inference without annotations
}
\`\`\`

### Performance Improvements

Compilation speed has improved dramatically:

| Version | Compilation Time |
|---------|-----------------|
| TS 4.0  | 10s             |
| TS 5.0  | 5s              |
| TS 6.0  | 1s              |

### Integration with AI Tools

TypeScript now works seamlessly with AI coding assistants, providing:

- Intelligent code completion
- Automated refactoring
- Bug detection before runtime

> "TypeScript in 2025 feels like pair programming with an expert who never gets tired." - Leading Developer
    `,
    date: '2025-03-15',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'Building Performant React Applications',
    excerpt: 'Tips and tricks for optimizing React applications for better performance and user experience.',
    content: `
## Optimizing React Performance

React applications can suffer from performance issues as they grow in complexity. Here are some proven strategies to keep your React apps fast and responsive.

### 1. Memoization Techniques

Use React's built-in memoization tools to prevent unnecessary re-renders:

\`\`\`jsx
// Use memo for component memoization
const MemoizedComponent = React.memo(ExpensiveComponent);

// Use useMemo for expensive calculations
const expensiveValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

// Use useCallback for function references
const memoizedCallback = useCallback(() => doSomething(a, b), [a, b]);
\`\`\`

### 2. Virtual DOM Optimization

- Keep component trees shallow
- Use keys properly in lists
- Implement shouldComponentUpdate wisely

### 3. Code Splitting

Split your bundle into smaller chunks that can be loaded on demand:

\`\`\`jsx
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function MyComponent() {
  return (
    <React.Suspense fallback={<Loading />}>
      <LazyComponent />
    </React.Suspense>
  );
}
\`\`\`

### 4. Performance Monitoring

Always measure performance with tools like:

- React DevTools Profiler
- Lighthouse
- Web Vitals

![Performance Optimization](https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80)
    `,
    date: '2025-02-28',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'The Rise of WebAssembly in Modern Web Development',
    excerpt: 'How WebAssembly is changing the landscape of web development and enabling new possibilities.',
    content: `
## WebAssembly: The Future of Web Performance

WebAssembly (Wasm) has transformed from an experimental technology to a core part of the web platform. Let's explore how it's changing web development in 2025.

### What is WebAssembly?

WebAssembly is a binary instruction format that provides near-native performance for web applications. It allows languages other than JavaScript to run in the browser at near-native speed.

### Key Benefits

1. **Performance**: Near-native execution speed
2. **Language Agnostic**: Write in Rust, C++, Go, and more
3. **Security**: Runs in a sandboxed environment
4. **Portability**: Works across all modern browsers

### Real-World Applications

- **Graphics-intensive applications**: Games, CAD software
- **Computation-heavy tasks**: Machine learning, data processing
- **Porting existing applications**: Desktop apps to web

### Code Example: Rust to WebAssembly

\`\`\`rust
// Rust code
#[no_mangle]
pub extern "C" fn add(a: i32, b: i32) -> i32 {
    a + b
}
\`\`\`

Using in JavaScript:

\`\`\`javascript
const { instance } = await WebAssembly.instantiateStreaming(
  fetch("math.wasm")
);
console.log(instance.exports.add(5, 7)); // 12
\`\`\`

### The WebAssembly Ecosystem

The ecosystem has matured significantly with tools like:

- **wasm-bindgen**: For Rust/JavaScript interop
- **Emscripten**: C/C++ to WebAssembly compiler
- **AssemblyScript**: TypeScript-like language for WebAssembly
- **WASI**: WebAssembly System Interface for portable system interfaces

### Future Directions

- **Garbage collection**: Native support for GC languages
- **Threading**: Improved multi-threading capabilities
- **SIMD**: Better vector processing support
- **Component model**: Improved modularity and composition
    `,
    date: '2025-01-20',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];

// Sample projects data
export const projects = [
  {
    id: 1,
    title: 'AI Code Assistant',
    description: 'A machine learning powered code completion tool that helps developers write code faster.',
    technologies: ['Python', 'TensorFlow', 'React'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    github: 'https://github.com',
    demo: 'https://demo.com'
  },
  {
    id: 2,
    title: 'Blockchain Explorer',
    description: 'A web application that allows users to explore and analyze blockchain transactions.',
    technologies: ['TypeScript', 'Node.js', 'Web3.js'],
    image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    github: 'https://github.com',
    demo: 'https://demo.com'
  },
  {
    id: 3,
    title: 'Smart Home Dashboard',
    description: 'An IoT dashboard for controlling and monitoring smart home devices.',
    technologies: ['React', 'GraphQL', 'MQTT'],
    image: 'https://images.unsplash.com/photo-1558002038-1055e2dae2d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    github: 'https://github.com',
    demo: 'https://demo.com'
  }
];