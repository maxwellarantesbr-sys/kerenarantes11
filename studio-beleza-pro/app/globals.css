@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  @apply transition-colors duration-200;
}

body {
  @apply bg-white text-dark-900;
}

/* Scrollbar personalizada */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  @apply bg-dark-100;
}

::-webkit-scrollbar-thumb {
  @apply bg-primary-400 rounded-full hover:bg-primary-500;
}

/* Utilities customizadas */
.card {
  @apply bg-white rounded-lg shadow-card p-6 hover:shadow-card-lg;
}

.card-lg {
  @apply bg-white rounded-xl shadow-card-lg p-8;
}

.btn-primary {
  @apply px-4 py-2 bg-accent-500 text-white rounded-lg font-medium hover:bg-accent-600 transition-colors;
}

.btn-secondary {
  @apply px-4 py-2 bg-dark-100 text-dark-900 rounded-lg font-medium hover:bg-dark-200 transition-colors;
}

.btn-danger {
  @apply px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors;
}

.btn-small {
  @apply px-3 py-1 text-sm;
}

.input-field {
  @apply w-full px-3 py-2 border border-dark-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent;
}

.input-field-lg {
  @apply w-full px-4 py-3 border border-dark-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent text-base;
}

.label {
  @apply block text-sm font-medium text-dark-700 mb-2;
}

.badge {
  @apply inline-flex items-center px-3 py-1 rounded-full text-sm font-medium;
}

.badge-success {
  @apply badge bg-green-100 text-green-800;
}

.badge-warning {
  @apply badge bg-yellow-100 text-yellow-800;
}

.badge-danger {
  @apply badge bg-red-100 text-red-800;
}

.badge-info {
  @apply badge bg-blue-100 text-blue-800;
}

.section-title {
  @apply text-2xl font-bold text-dark-900 mb-6;
}

.subsection-title {
  @apply text-lg font-bold text-dark-800 mb-4;
}

/* Animações */
@keyframes slideInLeft {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slideInLeft {
  animation: slideInLeft 0.3s ease-out;
}

.animate-slideInRight {
  animation: slideInRight 0.3s ease-out;
}

/* Responsividade */
@media (max-width: 768px) {
  .card {
    @apply p-4;
  }

  .card-lg {
    @apply p-6;
  }
}
