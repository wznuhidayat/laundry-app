<template>
  <div class="grid grid-cols-12 h-screen items-center px-6">
    <div class="col-span-6">
      <div class="max-w-sm mx-auto">
        <h2 class="text-4xl font-bold">Login</h2>
        <p class="text-gray-400">Welcome back! Log in to continue.</p>
      </div>
      <form class="mt-6 max-w-sm mx-auto">
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input
            class="input input-bordered w-full "
            id="email"
            type="email"
            placeholder="Enter your email"
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input
            class="input input-bordered w-full " 
            id="password"
            type="password"
            placeholder="Enter your password"
          />
        </div>
        <button
          class="btn btn-primary btn-block "
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
    <div class="col-span-6 flex items-center bg-primary h-screen px-6">
      <div class="max-w-sm">
        <h1 class="text-4xl font-bold  text-white">Laundry APP</h1>
        <p class="text-white font-semibold">Quick, Easy, and Reliable Laundry Service – Your Fresh Clothes Are Just a Click Away!</p>
      </div>
    </div>
  </div>
</template>
  