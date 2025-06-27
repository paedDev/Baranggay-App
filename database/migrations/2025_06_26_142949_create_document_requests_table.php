<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('document_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->constrained();
            $table->string('document_type');
            $table->string('purpose');
            $table->json('personal_info');
            $table->enum('status', ['pending', 'processing', 'ready', 'completed', 'rejected'])->default('pending');
            $table->text('admin_notes')->nullable();
            $table->decimal('fee', 8, 2)->default(0);
            $table->boolean('paid')->default(false);
            $table->timestamp('requested_at')->useCurrent();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('document_requests');
    }
};
